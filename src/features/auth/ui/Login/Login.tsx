import {useAppDispatch, useAppSelector} from "@/common/hooks"
import { selectThemeMode } from "@/app/app-slice.ts"
import { getTheme } from "@/common/theme"
import Grid from "@mui/material/Grid"
import { FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import {InputsLoginType, loginSchema} from "@/features/auth/lib/schemas"
import {loginTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice.ts";
import {Navigate} from "react-router";
import {Path} from "@/common/routing/Routing.tsx";


export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)




  const {
    // reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<InputsLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<InputsLoginType> = (data) => {
    dispatch(loginTC(data))
    // reset()
  }

  if(isLoggedIn){
    return <Navigate to={Path.Main} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField
                label="Email"
                margin="normal"
                error={!!errors.email}
                {...register("email")}
               />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
