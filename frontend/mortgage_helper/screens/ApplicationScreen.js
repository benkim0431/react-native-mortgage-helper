import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import Avatar from '../components/Avatar';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useUserInfoById from '../hooks/useUserInfoById';
import AccordionItem from '../components/AccordionItem';
import BasicInfoSec from '../components/BasicInfoSec';
import PropertyInfoSec from '../components/PropertyInfoSec';
import AssetInfoSec from '../components/AssetInfoSec';
import IncomeInfoSec from '../components/IncomeInfoSec';
import OtherPropInfoSec from '../components/OtherPropInfoSec';
import InvolvedProfInfoSec from '../components/InvolvedProfInfoSec';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {changeApplicationStatus, getApplicationsByAid, updateApplication} from '../api/application';

function ApplicationScreen({navigation, route}) {
  const {application} = route.params ?? {};
  const {user} = useUserContext();
  const hasData = user !== null;
  const queryClient = useQueryClient();
  const {_id: applicationId, broker, status, totalValue} = application;
  const [applicationDetail, setApplicationDetail] = useState({});
  const {data, isLoading} = useQuery(
    ['applicationsByAid', applicationId],
    () => getApplicationsByAid(applicationId),
    {
      onSuccess: data => {
        if (typeof data !== 'undefined') {
          if (data.application[0]) {
            // console.log('applicationDetail:', data.application);
            setApplicationDetail({...data.application[0]});
          }
        }
      },
    },
  );
  const {mutate: updateApplicationStatus} = useMutation(changeApplicationStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('applicatonsByCid');
      navigation.navigate('Home');
    },
  });

  // console.log('user:', user);
  const value = Number(totalValue);
  const clientName = `${user.firstName} ${user.lastName}`;
  let brokerName = '';
  if (typeof broker !== 'undefined') {
    const {data} = useUserInfoById(broker);
    brokerName = data ? `${data.user.firstName} ${data.user.lastName}` : '';
  }

  const Label = props => <Text style={styles.label}>{props.children}</Text>;
  const TextBox = props => <Text style={styles.textBox}>{props.children}</Text>;

  const markNotificationAsVisit = async() => {
    let data = {};
    if (applicationDetail.notificationClient || applicationDetail.notificationBroker) {
      if (user.type === 'Client') {
        data.notifyClient = false;
      }
      if (user.type === 'Broker') {
        data.notifyBroker = false;
      }
      await updateApplication(applicationId, data);
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries('applicationsByAid');
    navigation.setOptions({
      title: 'Application #',
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          {hasData ? (
            <Avatar style={styles.profile} source={user.photoURL} />
          ) : (
            <Avatar style={styles.profile} />
          )}
        </View>
      ),
    });
    return () => {
      markNotificationAsVisit();
    };
  }, [navigation, user]);

  const onApprove = () => {
    updateApplicationStatus({
      applicationId: applicationId,
      status: 'APPROVED',
    });
  };

  const onReject = () => {
    updateApplicationStatus({
      applicationId: applicationId,
      status: 'REJECTED',
    });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  return (
    <View style={styles.fullscreen}>
      <ScrollView style={styles.block}>
        <View style={styles.rowSections}>
          <View style={styles.rowStartSection}>
            <Label>Client:</Label>
            <Label>Broker:</Label>
            <Label>Province:</Label>
            <Label>Status:</Label>
          </View>
          <View style={styles.rowMiddleSection}>
            <TextBox>{clientName}</TextBox>
            <TextBox>{brokerName}</TextBox>
            <TextBox>{applicationDetail?.address?.province}</TextBox>
            <TextBox>{status}</TextBox>
          </View>
          <View style={styles.rowEndSection}>
            <View style={styles.status}>
              {{
                OPEN: <Icon name="update" size={32} color="#14213D" />,
                APPROVED: <Icon name="check" size={32} color="#14213D" />,
                REJECTED: <Icon name="clear" size={32} color="#14213D" />,
                SIMULATION: (
                  <Icon name="psychology" size={32} color="#14213D" />
                ),
              }[status] || <View style={styles.statusPlaceholder} />}
            </View>
            <TextBox>Calculated Value</TextBox>
            <Text style={styles.value}>${value.toLocaleString()}</Text>
          </View>
        </View>

        <AccordionItem title="Client Information">
          <BasicInfoSec
            Label={Label}
            TextBox={TextBox}
            info={applicationDetail.client}
          />
        </AccordionItem>
        <AccordionItem title="Property Information">
          <PropertyInfoSec
            Label={Label}
            TextBox={TextBox}
            info={applicationDetail.properties}
          />
        </AccordionItem>
        <AccordionItem title="Assets">
          <AssetInfoSec
            Label={Label}
            TextBox={TextBox}
            info={applicationDetail.assets}
          />
        </AccordionItem>
        <AccordionItem title="Incomes">
          <IncomeInfoSec
            Label={Label}
            TextBox={TextBox}
            info={applicationDetail.incomes}
          />
        </AccordionItem>
        <AccordionItem title="Other Properties">
          <OtherPropInfoSec
            Label={Label}
            TextBox={TextBox}
            info={applicationDetail.properties}
          />
        </AccordionItem>
        <AccordionItem title="Other Professionals">
          <InvolvedProfInfoSec
            Label={Label}
            TextBox={TextBox}
            info={applicationDetail.professionals}
          />
        </AccordionItem>
      </ScrollView>
      {(status == 'OPEN' && user.type == 'Broker') && (
        <View style={styles.rowButtons}>
          <View style={styles.rowButton}>
            <CustomButton title="Reject" theme="secondary" onPress={onReject} />
          </View>
          <View style={styles.rowButton}>
            <CustomButton title="Approve" onPress={onApprove} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#14213D',
  },
  block: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    paddingBottom: 50,
    padding: 10,
    borderRadius: 15,
  },
  profile: {
    marginVertical: 10,
  },
  rowStartSection: {},
  rowMiddleSection: {
    marginEnd: 30,
  },
  rowEndSection: {},
  rowSections: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowButton: {
    width: 150,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  status: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusPlaceholder: {
    width: 40,
    height: 40,
  },
  value: {
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
    color: '#FCA311',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  label: {
    color: '#14213D',
    fontSize: 15,
    fontWeight: 'bold',
    // marginEnd: 20,
  },
  textBox: {
    color: '#14213D',
    fontSize: 15,
    fontWeight: 'normal',
  },
  spinner: {
    flex: 1,
    backgroundColor: '#14213D',
  },
});

export default ApplicationScreen;
