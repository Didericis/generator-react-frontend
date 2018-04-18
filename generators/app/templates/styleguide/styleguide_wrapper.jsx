import React from 'react';

<%_ if (baseStyles) { _%>
import 'styles/global.css';
<%_ } _%>
import TestProvider from 'test_utils/test_provider';

export default function Wrapper(props) {
  return (
    <TestProvider>
      <%_ if (baseStyles) { _%>
      <div style={{ 
        backgroundColor: 'black', 
        color: '#fdf6e3', 
        fontFamily: 'Economica',
      }}>
      <%_ } else { _%>
      <div>
      <%_ } _%>
        {props.children}
      </div>
    </TestProvider>
  );
}
