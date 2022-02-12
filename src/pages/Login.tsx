import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button ,Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import styles from './Login.module.css';
import UserService from '../services/UserService';
import nodeRSA from 'node-rsa';
import publicKey from '../config';
import { useHistory } from "react-router-dom";

function Login(){
  const history = useHistory();
  const [userName , setUserName] = useState('');
  const [password , setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false)

  const checkLogin = async () => {
    setIsLoading(true);
    const key = new nodeRSA(publicKey);

    key.setOptions({
      encryptionScheme: 'pkcs1'
    });
    
    const ret: any = await UserService[isRegister ? 'register' : 'login']({
      userName,
      password: key.encrypt(new Buffer(password), 'base64')
    });
    setIsLoading(false)
    if (ret.success) {
      history.push('/index')
    } else {
      message.error(ret.data)
    }
  }

  const register = () => {
    const changeSubmitType = () => {
      setIsRegister(!isRegister)
    }
    return (
      <Button
        size="small"
        type="link"
        onClick={() => changeSubmitType()}>{isRegister ? '已有账户登录' : '注册新账户'}
      </Button>
    )
  }

  return (
    <div className={styles.loginWrap}>
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="blog System" bordered={true} style={{ width: 400 }} >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            
            prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}} />}
            onChange={(e)=>{setUserName(e.target.value)}}
          /> 
          <br/><br/>
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
            onChange={(e)=>{setPassword(e.target.value)}}
          />     
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin} >{isRegister ? '注册' : '登录'}</Button>
        </Card>
      </Spin>
    </div>
  )
}
export default Login