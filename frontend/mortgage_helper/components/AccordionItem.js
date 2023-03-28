import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function AccordionItem({children, title}) {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={[styles.accordTitle, expanded && styles.expended]}>
          {title}
        </Text>
        <Icon
          name={expanded ? 'expand-less' : 'expand-more'}
          size={25}
          color="#14213D"
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

const styles = StyleSheet.create({
  accordContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#14213D',
  },
  accordHeader: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    color: '#14213D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  accordBody: {
    marginBottom: 15,
  },
  expended: {
    color: '#FCA311',
  },
});
export default AccordionItem;
