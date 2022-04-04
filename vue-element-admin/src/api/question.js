import request from '@/utils/request'

export function saveQuestion(data){
    return request({
        url: '/question/save',
        method: 'post',
        data
    })
}

export function getList(query) {
    return request({
        url: '/question-manage/getAll/'+query.page +'/' +query.limit,
        method: 'get'
    })
}

export function updateStatus(id) {
    return request({
        url: '/question-manage/updateStatus/'+id,
        method: 'put'
    })
}

export function getAllQuestions(id) {
    return request({
        url: '/question-manage/getQuestions/' + id,
        method: 'get'
    })
}

export function createPresent(data) {
    return request({
        url: '/question/create',
        method: 'post',
        data
    })
}

//学生教评问卷获取
export function getQuestionsByToken(query) {
    return request({
        url: '/question-manage/getByToken/'+query.page +'/' +query.limit,
        method: 'get'
    })
}

//学生提交问题
export function submitQuestion(data) {
    return request({
        url: '/question-manage/submitQuestions',
        method: 'post',
        data
    })
}

//老师查看学生填写的个人问卷
export function checkStudent(id) {
    return request({
        url: '/question/checkTeacherQuestion/' + id,
        method: 'get'
    })
}

//管理查看学生问卷
export function cheackStduentAnswer(id) {
    return request({
        url: '/question/checkStudentAnswer/' + id,
        method: 'get'
    })
}

//学生获取老师的个人问卷
export function getTeacherPresentQuestion(){
    return request({
        url: '/question/getPresentQuestion',
        method: 'get'
    })
}