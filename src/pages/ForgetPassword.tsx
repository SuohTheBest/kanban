import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import {CustomSnackbar, useCustomSnackbar} from "../CustomSnackBar";
import {useState} from "react";
import axios from "axios";
import {apiUrl, PasswordTextfield, TimeWait} from "../Common";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            backgroundColor: '#4285f4',
            color: 'white',
            '&:hover': {
                backgroundColor: '#1a73e8',
            },
        },
    }),
);

export default function ForgetPassword() {
    const [errors, setErrors] = useState({
        field1: false,
        field2: false,
    });
    const [finishedStep1,setFinishedStep1] = useState(false);

    const {message, openMessage, info, closeInfo} = useCustomSnackbar();
    const navigate = useNavigate();
    const classes = useStyles();

    const handleSubmit1 = async (event: {
        preventDefault: () => void;
        currentTarget: HTMLFormElement | undefined;
    }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const val = {
            field1: data.get("username"),
            field2: data.get("email"),
        };

        const newErrors = {
            field1: false,
            field2: false,
        };
        let hasErrors = false;

        for (const key in val) {
            if (val[key as keyof typeof val] === '' || val[key as keyof typeof val] === null) {
                newErrors[key as keyof typeof val] = true;
                hasErrors = true;
            }
        }
        if (hasErrors) {
            info('还有必填项没有填写！', 'error');
            setErrors(newErrors);
            return;
        }
        setErrors(newErrors);
        try {
            const response = await axios.post(`${apiUrl}/user/reset-validate`, {
                username: val.field1,
                email: val.field2
            });
            console.log(response.data);
            if (response.data.success) {
                info('🎉验证成功', 'success');
                await TimeWait(1000);
                setFinishedStep1(true)
            } else
                info('用户名或邮箱错误！', 'error');
        } catch (error) {
            info('用户名或邮箱错误！', 'error');
        }
    };

    const handleSubmit2 = async (event: {
        preventDefault: () => void;
        currentTarget: HTMLFormElement | undefined;
    }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const val = {
            field1: data.get("password"),
            field2: data.get("confirmPassword"),
        };

        const newErrors = {
            field1: false,
            field2: false,
        };
        let hasErrors = false;

        for (const key in val) {
            if (val[key as keyof typeof val] === '' || val[key as keyof typeof val] === null) {
                newErrors[key as keyof typeof val] = true;
                hasErrors = true;
            }
        }
        if (hasErrors) {
            info('还有必填项没有填写！', 'error');
            setErrors(newErrors);
            return;
        }

        const pwdStr = val.field1!.toString();
        if (pwdStr.length < 6) {
            newErrors.field1 = true;
            setErrors(newErrors);
            info('密码至少需要有6个字符！', 'error');
            return;
        }

        if (val.field1 !== val.field2) {
            newErrors.field2 = true;
            setErrors(newErrors);
            info('确认密码不匹配！', 'error');
            return;
        }
        setErrors(newErrors);
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.post(`${apiUrl}/user/reset-password`, {
                password: val.field1,
            });
            console.log(response.data);
            if (response.data.success) {
                info('🎉修改成功', 'success');
                await TimeWait(2000);
                navigate('/workspace');
            } else
                info('出现错误！', 'error');
        } catch (error) {
            info('出现错误！', 'error');
        }
    };

    return (
        <div className="h-full w-full bg-gray-50">
            <Container className="py-20" maxWidth="sm">
                <Box
                    className="bg-white"
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        忘记密码
                    </Typography>
                    <Box component="form" onSubmit={finishedStep1 ? handleSubmit2 : handleSubmit1} noValidate
                         sx={{mt: 1}}>
                        {finishedStep1 ?
                            <>
                                <PasswordTextfield label="密码" name="password" error={errors.field1}/>
                                <PasswordTextfield label="确认密码" name="confirmPassword"
                                                   error={errors.field2}/>
                            </> :
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="用户名"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    error={errors.field1}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="电子邮件地址"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={errors.field2}
                                />
                            </>
                        }
                        <Box className="py-4">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                className={classes.button}
                            >
                                <h2 className="my-3 font-semibold text-white">继续</h2>
                            </Button>
                        </Box>
                    </Box>
                    <CustomSnackbar messageInfo={message} onClose={() => closeInfo()}
                                    isOpen={openMessage}/>
                </Box>
            </Container>
        </div>
    );
}