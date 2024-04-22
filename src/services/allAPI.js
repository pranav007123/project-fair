import { commonAPI } from "./commonAPI";
import { ServerUrl } from "./serverUrl";

// register api

export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${ServerUrl}/register`,reqBody)
}
// login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${ServerUrl}/login`,reqBody)
}

// add project
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${ServerUrl}/add-project`,reqBody,reqHeader)
}
// get all projects
export const getAllProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${ServerUrl}/all-projects?search=${searchKey}`,"",reqHeader)
}
// get userprojects
export const getUserProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${ServerUrl}/user-projects`,"",reqHeader)
}
// get homeprojects
export const getHomeProjectAPI = async ()=>{
    return await commonAPI("GET",`${ServerUrl}/home-projects`,"")
}

// editproject
export const editProjectAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${ServerUrl}/edit-project/${projectId}`,reqBody,reqHeader)
}
// remove project
export const removeProjectAPI = async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${ServerUrl}/remove-project/${projectId}`,{},reqHeader)
}

// updateuser
export const updateuserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${ServerUrl}/edit-user`,reqBody,reqHeader)
}