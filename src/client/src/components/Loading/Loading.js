import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
    <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%'
      }}>
      <Loader color="#2376B5" width="100" height="100" type="Oval"/>
    </div>
);

export default Loading;
