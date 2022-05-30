import {ChangeEvent, useEffect, useState} from "react";
import type {GetServerSideProps, NextPage} from 'next'
import {Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {Layout} from "../components/layouts";
import Cookies from 'js-cookie';
import axios from "axios";

interface Props {
    theme: string;
}

const ThemeChangerPage: NextPage<Props> = ({theme}) => {

    const [currentTheme, setCurrentTheme] = useState(theme);

    const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTheme(e.target.value);
        localStorage.setItem('theme', e.target.value);
        Cookies.set('theme', e.target.value);
    }

    const onClick = async () => {
        const {data} = await axios.get('/api/hello')
        console.log(data)
    }

    useEffect(() => {
        console.log('Cookies', Cookies.get('theme'))
    }, [])

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup value={currentTheme} onChange={onChangeTheme}>
                            <FormControlLabel value={'light'} control={<Radio/>} label={'Light'}/>
                            <FormControlLabel value={'custom'} control={<Radio/>} label={'Custom'}/>
                            <FormControlLabel value={'dark'} control={<Radio/>} label={'Dark'}/>
                        </RadioGroup>
                    </FormControl>
                </CardContent>

                <Button onClick={onClick}>
                    Solicitud
                </Button>
            </Card>
        </Layout>
    )

}


export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const {theme = 'light'} = req.cookies

    const validThemes = ['light', 'dark', 'custom']

    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'dark'
        }
    }

}

export default ThemeChangerPage
