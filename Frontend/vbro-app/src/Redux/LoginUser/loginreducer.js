import {
	USER__LOGIN_DATA_SENDING_FAILED,
	SEND_LOGIN_USER_DATA,
	USER_LOGIN_DATA_SENT,
} from "./actionType";

const initState = {
    isSending:false,
    isSent:false,
    isError:false,
    username:"",
    email: "",
    isUserLoggedIn:false,
}
export const loginreducer = (state = initState,action)=>{
    
switch(action.type){
    case SEND_LOGIN_USER_DATA:{
        return{
            ...state,
            isSending:true,
            username:action.payload.username
        }
    }
    case USER_LOGIN_DATA_SENT:{
        console.log(action);
        const {email, name} = action.payload.data.user;
        return{
            ...state,
            isSent:true,
            email: email,
            username: name,
            isUserLoggedIn: action.payload.data.isLoginSuccess
        }
    }
    case USER__LOGIN_DATA_SENDING_FAILED:{
        return{
            ...state,
            message:action.payload.message,
            isError:true
        }
    }

    default:{
        return{
            ...state
        }
    }
}
}
