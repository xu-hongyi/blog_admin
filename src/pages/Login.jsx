import React, { useState } from 'react'
import { Button, Input,  message } from "antd"
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import style from "../static/style/login.module.css"
import {login} from '../config/api'
export default function Login(props) {
	const [isLoding, setIsLoding] = useState(false)
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const loginIn = async () => {
		setIsLoding(true)
		if (!userName) {
			message.error("用户名不能为空")
			setTimeout(() => {
				setIsLoding(false)
			}, 1000)
			return false;
		} else if (!password) {
			message.error("密码不能为空")
			setTimeout(() => {
				setIsLoding(false)
			}, 1000)
			return false;
		}
		const data = {
			username: userName,
			password: password
		}
		const result = await login(data);
		setIsLoding(false);
		if(result.code === 200){
			props.history.push('/index')
			localStorage.setItem('token', result.token)
		}else{
			message.error(result.data)
		}
	}
	return (
		<div className={style.login}>
			<div className={style.content}>
				<Input
					size="large"
					placeholder="请输入用户名"
					value={userName}
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.3)' }} />}
					onChange={e => setUserName(e.target.value)}
				/>
				<Input.Password
					size="large"
					placeholder="请输入密码"
					value={password}
					prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.3)' }} />}
					onChange={e => setPassword(e.target.value)}
				/>
				<Button type="primary" ghost size="large" block loading={isLoding} onClick={loginIn}>Login in</Button>
			</div>
		</div>
	)
}
