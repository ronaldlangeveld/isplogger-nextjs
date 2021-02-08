import { useRouter } from "next/router";
import Link from 'next/link';
import api from "../../../utils/Api";
import { parseCookies } from "../../../utils/parseCookies";
import Layout from "../../../components/authlayout";
import { useEffect, useState, useContext } from "react";
import LatestCard from "../../../components/network/latestCard";
import Head from "next/head";
import cookie from "js-cookie";


const Test = ({id, cookies}) => {


    const ping = () => {
        var start = new Date().getTime();
        api.get('').then((res) => {
            console.log(res)
            var end = new Date().getTime();
            console.log(`${end-start} ms`)
        }, (err) => {
            console.log(err)
        })
    };

    return (
        <>
        <Layout>

            <button onClick={ping}>ping</button>

        </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const cookies = parseCookies(context.req);
    console.log(id);
    console.log(cookies);
    try {
        const res = await api.get(`network/${id}/settings/`, {
            headers: { Authorization: `Token ${cookies.ttk}` },
        });
        const initData = res.data;
        return {
            props: {
                cookies,
                initData,
                id
            },
        };
    } catch (err) {
        if (context.res) {
            context.res.writeHead(302, {
                Location: "/404",
            });
            context.res.end();
        }

        return {};
    }
}

export default Test;