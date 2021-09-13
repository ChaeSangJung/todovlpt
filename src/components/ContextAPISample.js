import React, { useMemo, useCallback, useReducer, useRef } from "react";
import ContextUserList from './ContextUserList';
import ContextCreateUser from './ContextCreateUser';
import useInputs from "../hook/useInputs";

const countActiveUsers = (users) => {
    console.log("활성 사용자 수를 세는중...");
    return users.filter((user)=>(user.active)).length;
};

const initialState = {
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
        case "CREATE_USER":
            return {
                users : state.users.concat(action.user)
            };
        case "TOGGLE_USER":
            return {
                ...state,
                users : state.users.map((user)=> (
                    user.id === action.id ? {...user, active: !user.active} : user
                ))
            };
        case "REMOVE_USER":
            return {
                ...state,
                users: state.users.filter((user)=>(user.id !== action.id))
            };
        default:
            return state;
    }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

const ContextAPISample = () => {
    const [{ username, email }, onChange, onReset] = useInputs({
        username : "",
        email : ""
    });
    const [state, dispatch] = useReducer(countReducer, initialState);
    const nextId = useRef(4);

    const { users } = state;

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        onReset();
        nextId.current += 1;
    }, [username, email, onReset]);

    const onToggle = useCallback(id => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        });
    }, []);

    const onRemove = useCallback(id => {
        dispatch({
            type: 'REMOVE_USER',
            id
        });
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);
    
    return (
        <UserDispatch.Provider value={dispatch}>
            <ContextCreateUser 
                username={username} 
                email={email} 
                onChange={onChange}
                onCreate={onCreate}
            />
            <ContextUserList 
                users={users} 
                onToggle={onToggle}
                onRemove={onRemove}
            />
            <div>활성사용자 수 : {count}</div>
        </UserDispatch.Provider>
    )
};

export default ContextAPISample;