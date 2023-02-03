import React, {useState} from 'react';
import BorderedInput from '../components/BorderedInput';

function SignForm({isSignUp, form, createChangeTextHandler}) {
  return (
    <>
      {isSignUp && (
        <>
          <BorderedInput
            hasMarginBottom={true}
            placeholder="First Name"
            value={form.firstName}
            onChangeText={createChangeTextHandler('firstName')}
          />
          <BorderedInput
            hasMarginBottom={true}
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={createChangeTextHandler('lastName')}
          />
        </>
      )}
      <BorderedInput
        hasMarginBottom={true}
        placeholder="Email"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <BorderedInput
        hasMarginBottom={true}
        placeholder="Password"
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
      />
      {isSignUp && (
        <BorderedInput
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
        />
      )}
    </>
  );
}

export default SignForm;
