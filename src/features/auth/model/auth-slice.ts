import {createAppSlice} from "@/common/utils";
import {authApi} from "@/features/auth/api/authApi.ts";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError.ts";
import {InputsLoginType} from "@/features/auth/lib/schemas";
import {ResultCode} from "@/common/enums";
import {handleServerAppError} from "@/common/utils/handleServerAppError.ts";
import {AUTH_TOKEN} from "@/common/constant";
import {clearDataAC} from "@/common/actions";


export const authSlice = createAppSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    },
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (payload: InputsLoginType, {rejectWithValue, dispatch}) => {
                try {
                    dispatch(setAppStatusAC({status: "loading"}))
                    const res = await authApi.login(payload)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: "succeeded"}))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    console.log(error)
                    handleServerNetworkError(error, dispatch)
                    dispatch(setAppStatusAC({status: "failed"}))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        logoutTC: create.asyncThunk(
            async (_, {rejectWithValue, dispatch}) => {
                try {
                    dispatch(setAppStatusAC({status: "loading"}))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: "succeeded"}))
                        localStorage.removeItem(AUTH_TOKEN)
                        dispatch(clearDataAC())
                        return {isLoggedIn: false}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    console.log(error)
                    handleServerNetworkError(error, dispatch)
                    dispatch(setAppStatusAC({status: "failed"}))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        meTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({status: 'loading'}))
                    const res = await authApi.me()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
    })
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC, logoutTC, meTC} = authSlice.actions
export const authReducer = authSlice.reducer;
