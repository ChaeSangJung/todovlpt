import React, { useCallback, useReducer, useRef } from "react";
import UserList from './UserList';
import CreateUser from './CreateUser';

const countActiveUsers = (users) => {
    console.log("활성 사용자 수를 세는중...");
    // return users.filter((user)=>(user.active)).length;
    return users.filter(user => user.active).length;
};

const initialState = {
    inputs: {
        username: '',
        email: ''
    },
    users: [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        }
    ]
};

const countReducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                inputs: {
                    // reducer 함수에서 새로운 상태를 만들 때에는 
                    // 불변성을 지켜주어야 하기 때문에 
                    // 위 형태와 같이 spread 연산자를 사용해주었습니다.
                    ...state.inputs,
                    [action.name]:action.value
                }
            };
        case "CREATE_USER":
            return {
                inputs: initialState.inputs,
                users : state.users.concat(action.user)
            }
        default:
            return state;
    }
}

const CountUser = () => {
    const [state, dispatch] = useReducer(countReducer, initialState);
    const nextId = useRef(4);

    const { inputs : { username, email } } = state;
    const { users } = state;

    const onChange = useCallback((e)=>{
        const { target : {name, value} } = e;
        dispatch({
            type : "CHANGE_INPUT",
            name,
            value

        });
    },[]);

    const onCreate = useCallback(()=>{
        dispatch({
            type: "CREATE_USER",
            user : {
                id: nextId.current,
                username,
                email
            }
        });
        nextId.current += 1;
    },[username, email]);

    return (
        <div>
            <CreateUser 
                username={username} 
                email={email} 
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} />
            <div>활성사용자 수 : 0</div>
        </div>
    )
};

export default CountUser;