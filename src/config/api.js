import request from './requestConfig'
import path from './urls'
export const login = async (data) =>{
	return await request.post(path.login, data)
}

export const getTypeInfo = async () =>{
	return await request.get(path.getTypeInfo)
}

export const addArticle = async (props) =>{
	return await request.post(path.addArticle, props)
}

export const updateArticle = async (props) =>{
	return await request.post(path.updateArticle, props)
}

export const getArticleList = async () =>{
	return await request.get(path.getArticleList)
}

export const deleteArticle = async id =>{
	return await request.get(path.deleteArticle + id)
}

export const getArticleById = async id =>{
	return await request.get(path.getArticleById + id)
}

export const getTypeCount = async () =>{
	return await request.get(path.getTypeCount)
}




