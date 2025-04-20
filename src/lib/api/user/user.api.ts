import { UserType } from "@/lib/schema/user.schema";
import { makeApiCall } from "../network/makeApiCall";
import { RestMethod } from "../network/network.enum";

type UserResponseType = UserType&{
  _id: string;
}
const routeList =["api","users" ];

export const createUserAction=(body: UserType)=> makeApiCall<UserResponseType>({
      path: routeList.join('/'),
      method: RestMethod.POST,
      body, 
    });
  
  export const getAllUserListAction=( )=>  makeApiCall<UserResponseType[]>({
      path: routeList.join('/'),
      method: RestMethod.GET,  
      
    });

  
  export const  getUserAction =(userId: string)=>   makeApiCall<UserResponseType>({
        path: [...routeList, userId].join('/'),
      method: RestMethod.GET, 
    });

   
  
  export const updateUserAction =(
    userId: string,
    body: UserType,
  ) => { 
    console.log({
      userId,
      body,
    })
    return  makeApiCall<UserResponseType>({
        path: [...routeList, userId].join('/'),
      method: RestMethod.PATCH,
      body,
    })};

  
  export const  deleteUserAction=(userId: string)=>  makeApiCall<UserResponseType>({
    path: [...routeList, userId].join('/'),
      method: RestMethod.DELETE, 
    });
  