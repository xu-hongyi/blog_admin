import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button, Space } from "antd"
import {getArticleList, deleteArticle} from '../config/api'
import styles from '../static/style/ArticleList.module.css'
const { confirm } = Modal
export default function ArticleList(props) {
	const [list, setList] = useState([])
	const listHeader = <Row>
		<Col span={8}>
			<b>标题</b>
		</Col>
		<Col span={4}>
			<b>类别</b>
		</Col>
		<Col span={4}>
			<b>发布时间</b>
		</Col>
		<Col span={4}>
			<b>浏览量</b>
		</Col>
		<Col span={4}>
			<b>操作</b>
		</Col>
	</Row>
	useEffect(() => {
		getList()
	}, [])
	const getList = async () => {
		const result = await getArticleList();
		setList(result.data);
	}
	const deleteArt = id =>{
		confirm({
			title:'确定要删除这篇文章吗？',
			content:"点击🆗后文章将被删除,无法恢复",
			async onOk(){
				const result =  await deleteArticle(id)
				message.success("删除文章成功")
				await getList();
			},
			onCancel(){
				message.success("文章没有任何变化")
			}
		})
	}
	//修改文章
	const updateArticle = (id) =>{
		props.history.push('/index?=' + id)
	}
	return (
		<div className={styles.wrapper}>
			<List
				header={listHeader}
				bordered
				dataSource={list}
				renderItem={item => (
					<List.Item>
						<Row style={{ width: '100%' }}>
							<Col span={8}>
								{item.title}
							</Col>
							<Col span={4}>
								{item.typeName}
							</Col>
							<Col span={4}>
								{item.addTime}
							</Col>
							<Col span={4}>
								{item.view_count}
							</Col>
							<Col span={4}>
								<Space>
									<Button type="primary" onClick={() =>{updateArticle(item.id)}}>修改</Button>
									<Button type="danger" onClick={() =>{deleteArt(item.id)}}>删除</Button>
								</Space>
							</Col>
						</Row>
					</List.Item>
				)}
			/>
		</div>
	)
}
