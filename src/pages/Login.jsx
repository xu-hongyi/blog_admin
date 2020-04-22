import React,{useState} from 'react'
import {Button, Input, Card, Spin} from "antd"
import {UserOutlined, KeyOutlined} from '@ant-design/icons'
import "../static/login.module.css"
export default function Login() {
	const [isLoding, setIsLoding] = useState(false)
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const checkLogin = () =>{
		setIsLoding(true)
		setTimeout(() => {
			setIsLoding(false)
		}, 1000);
	}
	return (
		<div className='login'>
			<Spin tip="Loading..." spinning={isLoding}>
				<Card title="blog System" bordered={true} style={{width:400}}>
					<Input 
						size="large"
						placeholder="请输入用户名"
						value={userName}
						prefix={<UserOutlined style={{color:'rgba(0,0,0,.3)'}}/>}
						onChange={e => setUserName(e.target.value)}
					/>
					<br/><br/>
					<Input.Password
						size="large"
						placeholder="请输入密码"
						value={password}
						prefix={<KeyOutlined style={{color:'rgba(0,0,0,.3)'}}/>}
						onChange={e => setPassword(e.target.value)}
					/>
					<br /><br />
					<Button type="default" size="large" block onClick={checkLogin}>Login in</Button>
				</Card>
			</Spin>
		</div>
	)
}
