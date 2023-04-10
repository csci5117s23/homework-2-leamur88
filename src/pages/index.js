import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import BasicHeader from "@/components/BasicHeader"
import { Button } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <>
	<Head>
	
	</Head>
	<BasicHeader />
	<h1>This is my website</h1>
	<Link href={"/todo"}><Button variant="contained" size="large">Sign in/up!</Button></Link>
	<Link href={"/todo"}><Button variant="contained" size="large">See your Todo Items</Button></Link>
	<Link href={"/todo"}><Button variant="contained" size="large">See What you've already done!</Button></Link>
    </>
  )
}
