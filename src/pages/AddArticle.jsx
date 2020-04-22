import React, { useState, useEffect } from 'react'
import marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, Space, message } from 'antd'
import styles from '../static/style/AddArticle.module.css'
import axios from "axios"
import servicePath from '../config/apiUrl'
const { Option } = Select;
const { TextArea } = Input
export default function AddArticle(props) {
	const {location} = props;

	const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState('')   //文章标题
	const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState('') //html内容
	const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
	const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
	const [showDate, setShowDate] = useState()   //发布日期
	const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
	const [selectedType, setSelectType] = useState('请选择类别') //选择的文章类别
	useEffect(() => {
		getTypeInfo();
	}, [])
	useEffect(() =>{
		if(location.search){
			const searArr = location.search.split("=")
			const id = Number(searArr[searArr.length - 1])
			setArticleId(id)
			getArticleById(id)
		}
	}, [location])
	const render = new marked.Renderer();
	marked.setOptions({
		renderer: render,
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false,
	  }); 
	const changeContent = e =>{
		setArticleContent(e.target.value)
		const html = marked(e.target.value)
		setMarkdownContent(html)
	}
	const changIntroduce = e =>{
		setIntroducemd(e.target.value);
		const html = marked(e.target.value);
		setIntroducehtml(html)
	}

	const getTypeInfo = () =>{
		axios({
			method:"get",
			url:servicePath.getTypeInfo,
			withCredentials:true
		}).then(res =>{
			if(res.data.data == '没有登陆'){
				localStorage.removeItem('openId')
				props.history.push("/login")
			}else{
				setTypeInfo(res.data.data)
			}
		})
	}

	const selectTypeHandle = value =>{
		setSelectType(value)
	}

	const saveArtical = () =>{
		if(!selectedType){
			message.error("必须选择文章类型")
			return false;
		}else if(!articleTitle){
			message.error("文章标题不能为空")
			return false
		}else if(!articleContent){
			message.error("文章内容不能为空")
			return false
		}else if(!introducemd){
			message.error("文章简介不能为空")
			return false
		}else if(!showDate){
			message.error("发布日期不能为空")
			return false
		}
		const dataProps = {};
		dataProps.type_id = selectedType;
		dataProps.title = articleTitle;
		dataProps.article_content = articleContent;
		dataProps.introduce = introducemd;
		const dateText = showDate.replace('-', '/')
		dataProps.addTime = (new Date(dateText).getTime()) / 1000;
		if(articleId == 0){
			dataProps.view_count = 0;
			axios({
				method:"post",
				url:servicePath.addArticle,
				data:dataProps,
				withCredentials:true
			}).then(res => {
				setArticleId(res.data.insertId)
				if(res.data.isSuccess){
					message.success("文章添加成功")
				}else{
					message.error("文章添加失败")
				}
			})
		}else{
			dataProps.id = articleId;
			axios({
				method:"post",
				url:servicePath.updateArticle,
				data:dataProps,
				withCredentials:true
			}).then(res =>{
				if(res.data.isSuccess){
					message.success("文章修改成功")
				}else{
					message.error('文章修改失败')
				}
			})
		}
	}

	const getArticleById = id =>{
		axios(servicePath.getArticleById + id, {withCredentials:true}).then(res =>{
			if(res.data.data){
				const article = res.data.data[0];
				setArticleTitle(article.title);
				setArticleContent(article.article_content);
				const html = marked(article.article_content);
				setMarkdownContent(html);
				setIntroducemd(article.introduce);
				const introducehtml = marked(article.introduce);
				setIntroducehtml(introducehtml);
				setShowDate(article.addTime);
				setSelectType(article.typeName)
			}
		})
	}

	
	return (
		<div>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10}>
						<Col span={20}>
							<Input
								placeholder="博客标题"
								size="large"
								onChange={e =>{setArticleTitle(e.target.value)}}
								value={articleTitle}
							/>
						</Col>
						<Col span={4}>
							<Select defaultValue={selectedType} size="large" onChange={selectTypeHandle}>
								{typeInfo.map((item, index) => <Option key={index} value={item.id}>{item.typename}</Option> )}>
							</Select>
						</Col>
					</Row>
					<br />
					<Row gutter={10}>
						<Col span={12}>
							<TextArea
								className={styles.content}
								rows={35}
								value={articleContent}
								placeholder="文章内容"
								onChange={changeContent}
							/>
						</Col>
						<Col span={12}>
							<div className={styles.show_html}
								dangerouslySetInnerHTML={{__html:markdownContent}}
							></div>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					<Row style={{ marginLeft: 10 }}>
						<Col span={24}>
							<div className={styles.date_select}>
								<DatePicker placeholder="发布日期" size="large" onChange={(data, dataString) => {setShowDate(dataString)}} />
							</div>
						</Col>
						<Col span={24}>
							<Space size='large'>
								<Button size="large" onClick={() =>{setArticleId(0)}}>新建文章</Button>
								<Button size="large" type="primary" onClick={saveArtical}>发布文章</Button>
							</Space>
						</Col>
						<Col span={24} style={{ marginTop: 10 }}>
							<TextArea rows={4} placeholder="文章简介" onChange={changIntroduce} value={introducemd} />
							<div className={styles.introduce}
								dangerouslySetInnerHTML={{__html:introducehtml}}
							></div>
						</Col>
					</Row>

				</Col>
			</Row>
		</div>
	)
}
