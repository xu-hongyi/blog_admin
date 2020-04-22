let ipUrl = "http://127.0.0.1:7001/admin/"

let servicePath = {
	checkLogin : ipUrl + 'checkLogin',//检查是否登录
	getTypeInfo : ipUrl + "getTypeInfo", //获取文章类别信息
	addArticle : ipUrl + "addArticle", //添加文章
	updateArticle : ipUrl + "updateArticle", //修改文章
	getArticleList:ipUrl + 'getArticleList', //文章列表
	deleteArticle:ipUrl + 'deleteArticle/', //根据id删除文章
	getArticleById:ipUrl + 'getArticleById/',//根据id获取文章详情
	getTypeCount:ipUrl + 'getTypeCount'
}

export default servicePath;