import React, { useState, useEffect } from 'react'
import { Layout, Menu, PageHeader, Descriptions, Tag, Statistic,Row, Col, Button } from 'antd';
import styles from '../static/style/AdminIndex.module.css'
import { Route } from "react-router-dom"
import AddArticle from './AddArticle'
import { createFromIconfontCN } from '@ant-design/icons';
import ArticleList from './ArticleList'
import {getTypeCount} from '../config/api'
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_1772428_v4kxnngd8tl.js',
  });
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Admin = props => {
	const [collapsed, setCollapsed] = useState(false)
	const [html, setHtml] = useState(0)
	const [css, setCSS] = useState(0)
	const [js, setJS] = useState(0)
	const [node, setNode] = useState(0)
	
	useEffect(() =>{
		const getCount = async () =>{
			const result = await getTypeCount()
			result.data.forEach(item => {
				switch (item.type_id) {
					case 1:
						setHtml(item.num);
						break;
					case 2:
						setCSS(item.num);
						break;
					case 3:
						setJS(item.num);
						break;
					case 4:
						setNode(item.num);
						break;
					default:
						break;
					
				}
			});
		}
		getCount()
	}, [])

	const onCollapse = () => setCollapsed(!collapsed);
	const handleClicKMenu = e =>{
		if(e.key === 'addArticle'){
			props.history.push('/index')
		}else if(e.key === "articleList"){
			props.history.push('/index/articleList')
		}
	}

	const loginOut = () =>{
		localStorage.removeItem("token")
		props.history.push('/')
	}
	return (
		<Layout style={{ minHeight: '100vh' }} theme="light">
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className={styles.logo} />
				<Menu theme="light" defaultSelectedKeys={['addArticle']} mode="inline">
					<SubMenu
						onClick={handleClicKMenu}
						title={
							<span>
								<IconFont type="icon-tubiaozhizuomobanyihuifu-" style={{fontSize:16}}/>
								<span>博文管理</span>
							</span>
						}
					>
						<Menu.Item key="addArticle">
						<IconFont type="icon-tianjia" style={{fontSize:16}}/>添加博文</Menu.Item>
						<Menu.Item key="articleList">
						<IconFont type="icon-liebiao" style={{fontSize:16}}/>文章列表</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
			<Layout>
				<Header className={styles.site_layout} style={{ padding: 18, backgroundColor: "#f5f5f5",marginBottom:10,height:160 }}>
					<PageHeader
						ghost={false}
						onBack={() => window.history.back()}
						title="Slinky's Blog"
						subTitle="仅供个人学习使用"
						avatar={{ src: 'https://gitee.com/slowly_and_slowly/cloudImg/raw/master/1587525974(1).png' }}
						tags={[<Tag key="1" color="magenta">游戏人生</Tag>,<Tag key="2" color="red">快乐学习</Tag>]}
						extra={[
							<Button key="0" type="danger" ghost icon={<IconFont type="icon-loginout" />} onClick={loginOut}>退出登录</Button>
						  ]}
					>
						<Row>
							<Col span={16}>
							<Descriptions size="small" column={2}>
								<Descriptions.Item label="作者" >Honhyi Xu</Descriptions.Item>
								<Descriptions.Item label="创作时间" >2020-4-22</Descriptions.Item>
								<Descriptions.Item label="发布时间" >2020-5-20</Descriptions.Item>
								<Descriptions.Item label="住址" >
									Sanmenxia, Henan, China
								</Descriptions.Item>
							</Descriptions>
							</Col>
							<Col span={4} flex="auto">
								<Statistic title={<IconFont type="icon-HTML" style={{fontSize:30}}/>} value={html} suffix="篇" />
							</Col>
							<Col span={4} flex="auto">
								<Statistic title={<IconFont type="icon-CSS" style={{fontSize:30}}/>} value={css} suffix="篇" />
							</Col>
							<Col span={4} flex="auto">
								<Statistic title={<IconFont type="icon-JS" style={{fontSize:30}}/>} value={js} suffix="篇" />
							</Col>
							<Col span={4} flex="auto">
								<Statistic title={<IconFont type="icon-nodejs" style={{fontSize:30}}/>} value={node} suffix="篇" />
							</Col>
						</Row>
					</PageHeader>
				</Header>
				<Content style={{ margin: '16px' }}>
					<div className={styles.site_layout} style={{ padding: 24, minHeight: 360 }}>
						<Route path="/index" exact component={AddArticle} />
						<Route path="/index/articleList" exact component={ArticleList} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</Layout>
	);
}

export default Admin