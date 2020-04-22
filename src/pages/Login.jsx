import React, { useState } from 'react'
import { Button, Input, Card, Spin, message } from "antd"
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import style from "../static/style/login.module.css"
import servicePath from '../config/apiUrl'
import axios from "axios"
export default function Login(props) {
	const [isLoding, setIsLoding] = useState(false)
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const checkLogin = () => {
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
		axios({
			method: 'post',
			url: servicePath.checkLogin,
			data: data,
			withCredentials: true
		}).then(res => {
			setIsLoding(false);
			if (res.data.data == "登陆成功") {
				localStorage.setItem("openId", res.data.openId)
				props.history.push("/")
			} else {
				message.error("用户名或密码错误")
			}
		})
	}
	return (
		<div className={style.login}>
			<Spin tip="Loading..." spinning={isLoding}>
				<Card title="Slinky's Blog System" bordered={true} style={{ width: 400 }}>
					<Input
						size="large"
						placeholder="请输入用户名"
						value={userName}
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.3)' }} />}
						onChange={e => setUserName(e.target.value)}
					/>
					<br /><br />
					<Input.Password
						size="large"
						placeholder="请输入密码"
						value={password}
						prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.3)' }} />}
						onChange={e => setPassword(e.target.value)}
					/>
					<br /><br />
					<Button type="default" size="large" block onClick={checkLogin}>Login in</Button>
				</Card>
			</Spin>
		</div>
	)
}
