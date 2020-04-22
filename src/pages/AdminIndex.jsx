import React, { useState, useEffect } from 'react'
import { Layout, Menu, PageHeader, Descriptions, Tag, Statistic,Row, Col } from 'antd';
import styles from '../static/style/AdminIndex.module.css'
import { Route } from "react-router-dom"
import AddArticle from './AddArticle'
import { createFromIconfontCN, ConsoleSqlOutlined } from '@ant-design/icons';
import axios from "axios"
import servicePath from '../config/apiUrl'
import ArticleList from './ArticleList'
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_1772428_4tu8moknrg3.js',
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
		const count = async () =>{
			const typeCount = await getTypeCount();
			const typeName = await getTypeInfo();
			typeName.forEach(item =>{
				typeCount.forEach(it =>{
					if(it.type_id === item.id){
						// set[item.typename](it[count(1)])
					}
				})
			})
		};
		count()
	},[])
	const onCollapse = () => setCollapsed(!collapsed);
	const handleClicKMenu = e =>{
		if(e.key === 'addArticle'){
			props.history.push('/index')
		}else if(e.key === "articleList"){
			props.history.push('/index/articleList')
		}
	}
	const getTypeCount = () =>{
		return axios(servicePath.getTypeCount, {withCredentials:true}).then(res =>{
			return res.data.data;	
		})
	}
	const getTypeInfo = () =>{
		return axios({
			method:"get",
			url:servicePath.getTypeInfo,
			withCredentials:true
		}).then(res =>{
			if(res.data.data == '没有登陆'){
				localStorage.removeItem('openId')
				props.history.push("/login")
			}else{
				return res.data.data;
			}
		})
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