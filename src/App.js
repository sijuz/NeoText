import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Top from './panels/Top';

import Error from './panels/Error';

import Offline from './panels/Offline';

import './panels/Persik.css';

const crypto = require('crypto');
import API from './api';




import axios from 'axios';
import {
	Button,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
	Div,
	View,
	ScreenSpinner,
	withAdaptivity,
	VKCOM,
	ViewWidth,
	SplitLayout,
	PanelHeader,
	SplitCol,
	Panel,
	Group,
	Cell,
	Epic,
	Tabbar,
	TabbarItem,
	usePlatform,
	CardGrid,
	Card,
	ConfigProvider,
	AdaptivityProvider,
	AppRoot,
	WebviewType,
	CellButton,
	Title,
	Separator,
	Platform,
	PanelHeaderButton, Banner, FormLayout, FormLayoutGroup, Radio, Input, FormItem, FormStatus, Snackbar, Link, Footer
} from "@vkontakte/vkui";
import {
	Icon24MoneyTransferOutline, Icon28AddCircleOutline,
	Icon28BombOutline, Icon28CancelCircleFillRed,
	Icon28ClipOutline, Icon28MenuOutline,
	Icon28MessageOutline, Icon28MoneyCircleOutline, Icon28MoneyRequestOutline, Icon28MoneySendOutline,
	Icon28NewsfeedOutline,
	Icon28ServicesOutline,
	Icon28UserCircleOutline, Icon28UserOutline, Icon28Users3Outline, Icon28WristWatchOutline
} from "@vkontakte/icons";



function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function setCookie(c_name, value, exdays) {
	let exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	let c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	let i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x === c_name) {
			return unescape(y);
		}
	}
}

function getUrlVar(){
	var urlVar = window.location.search; // ???????????????? ?????????????????? ???? ????????
	var arrayVar = []; // ???????????? ?????? ???????????????? ????????????????????
	var valueAndKey = []; // ???????????? ?????? ???????????????????? ???????????????? ???????????????? ?? ?????????? ????????????????????
	var resultArray = []; // ???????????? ?????? ???????????????? ????????????????????
	arrayVar = (urlVar.substr(1)).split('&'); // ?????????????????? ?????? ???? ??????????????????
	if(arrayVar[0]==="") return false; // ???????? ?????? ???????????????????? ?? ????????
	for (let i = 0; i < arrayVar.length; i ++) { // ???????????????????? ?????? ???????????????????? ???? ????????
		valueAndKey = arrayVar[i].split('='); // ?????????? ?? ???????????? ?????? ???????????????????? ?? ???? ????????????????
		resultArray[valueAndKey[0]] = valueAndKey[1]; // ?????????? ?? ???????????????? ???????????? ?????? ???????????????????? ?? ???? ????????????????
	}
	return resultArray; // ???????????????????? ??????????????????
}

const sheme = function () {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// dark mode
		document.querySelector('body').setAttribute("scheme","space_gray");
		let frame = document.querySelector('body');
		frame.setAttribute("scheme","space_gray");

		document.querySelector('link[rel="manifest"]').setAttribute("href","/webmanifest2.json");
		document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content","#000");
		document.querySelector('meta[name="theme-color"]').setAttribute("content","#000");
		document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content","black");
	}
};


function useInterval(callback, delay) {
	const savedCallback = React.useRef();

	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	React.useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		if (delay !== null) {
			const interval = setInterval(tick, delay);

			return () => clearInterval(interval);
		}
	}, [delay]);
}


const App = withAdaptivity(({ viewWidth }) => {
	// ?????????? ??????????????
	const platform = usePlatform();
	const isDesktop = window.innerWidth >= 1000;
	const hasHeader = platform !== VKCOM;
	const version = 24;

	// ?????????? ????????????????????
	const [activeStory, setActiveStory] = useState('home');
	const [activePanel, setActivePanel] = useState('home');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [activeModal,setActiveModal] = useState(null);
	const [snackbar,setSnackbar] = useState(null);

	const [online,setOnline] = useState(true);

	// ?????????? ???????????? ?? ??????????????
	const [userData,setUserData] = useState(null);
	const [userPayment,setUserPayment] = useState(null);
	const [bonus,setBonus] = useState(null);

	// ?????????? ????????????
	const [error,setError] = useState(null);
	const [error2,setError2] = useState(null);

	const [mining,setMining] = useState(0);
	let mining2 = 0;

	const [balance,setBalance] = useState(0.00000001);

	const [speedUser,setSpeedUser] = useState(0.00000);
	const [speed,setSpeed] = useState(0.00000);


	const [hSpeed,setHSpeed] = useState(1);
	let hspeed2 = 1;


	const [hi,setHi] = useState([]);

	//????????
	const [UUID,setUUID] = useState(null);

	//????????????????????
	const [deferredPrompt,setDeferredPrompt] = useState(null);

	//??????????
	const [typeR,setTypeR] = useState('qiwi');
	const [sumR,setSumR] = useState(null);
	const [numberR,setNumberR] = useState(null);
	const [errorR,setErrorR] = useState(null);

	//????????????
	const [codeR,setCodeR] = useState("");

	//???????????? ???? ????????????
	const [paymentData,setPaymentData] = useState(null);

	//?????? ??????????????

	const [textArea,setTextArea] = useState("");

	const [textOp,setTextOp] = useState("");

	const [regOn,setRegOn] = useState(false);


	useEffect(() => {

		 sheme();

		setPopout(null);

		window.addEventListener('online', e =>setOnline(true));
		window.addEventListener('offline', e =>setOnline(false));


		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent the mini-infobar from appearing on mobile
			console.log("start beforeinstallprompt");
			e.preventDefault();
			// setDeferredPrompt(e);
			setDeferredPrompt(e);
			console.log(2);
		});

		// checkPwa()



	}, []);

	const Nicetext = async function (tt = textArea) {

		if (tt !== "") {

			// const data = await new API().Post("process_text", {text: tt});
			// // key();
			// if (!data.error) {
			// 	// setUserData(data)
			// 	// setUserPayment(data.payouts_list)
			// 	console.log(data)
			// 	setTextOp(data.analyze);
			// } else {
			// 	setError(data.error_code);
			// 	setError2(data.error2);
			// 	setActiveStory("error");
			// 	setActivePanel("home");
			// }

			let voices = speechSynthesis.getVoices();
			let utterance = new SpeechSynthesisUtterance(tt);
			utterance.voice = voices[5];
			speechSynthesis.speak(utterance);
		} else {
			setSnackbar(<Snackbar
				onClose={() => setSnackbar(null)}

			>???????????? ????????</Snackbar>)
		}
	}


	const Kuku = async function () {
		let recognizer = new webkitSpeechRecognition();
		recognizer.interimResults = true;
		recognizer.lang = 'ru-Ru';

		let g = null;

		recognizer.onresult = function (event) {
			let result = event.results[event.resultIndex];
			if (result.isFinal) {
				// alert('???? ??????????????: ' + result[0].transcript);
				setTextArea(result[0].transcript);

				Nicetext(result[0].transcript);

				clearTimeout(g)
				g = null;
			} else {
				console.log('?????????????????????????? ??????????????????: ', result[0].transcript);
				setTextArea(result[0].transcript);
				// Nicetext(result[0].transcript);

				clearTimeout(g)
				g = null;
			}
		};

		recognizer.onsoundend = function(event) {
			g = setTimeout(()=>{recognizer.stop();setRegOn(false);},2000);
		}

		recognizer.onspeechend = function(event) {
			g = setTimeout(()=>{recognizer.stop();setRegOn(false);},2000);
		}

		recognizer.onerror = function(event) {
			setSnackbar(<Snackbar
				onClose={() => setSnackbar(null)}

			>{event.error}</Snackbar>)
			setTimeout(()=>{window.location.reload();},2000);

		}

		recognizer.start();
		setRegOn(true);
	}



	const checkPwa = async function () {
		const isInStandaloneMode = () =>
			(window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone);

		if (isInStandaloneMode()) {
			console.log("webapp is installed");
			const data = await new API().Post("api.bonus.install",{user_uuid: getCookie("uuid")});
			return true
		} else {
			console.log("webapp is not installed");

			setActiveStory("top")
			setActivePanel("top")

			return false

		}
	};

	const typeOS = () => {
		let Name = "Unknown OS";

		if (navigator.userAgent.indexOf("Win") !== -1) Name ="Windows OS";

		if (navigator.userAgent.indexOf("Mac") !== -1) Name ="Macintosh";

		if (navigator.userAgent.indexOf("Linux") !== -1) Name ="Linux OS";

		if (navigator.userAgent.indexOf("Android") !== -1) Name ="Android OS";

		if (navigator.userAgent.indexOf("like Mac") !== -1) Name ="iOS";

		return Name;
	};

	const addd = () => {
		if (typeOS() === "Windows OS" || typeOS() === "Android OS") {
			// let deferredPrompt = deferredPrompt;
			if (deferredPrompt) {
				if (deferredPrompt.prompt) {
					deferredPrompt.prompt();
					// Wait for the user to respond to the prompt
					deferredPrompt.userChoice.then((choiceResult) => {
						if (choiceResult.outcome === 'accepted') {
							console.log('User accepted the install prompt');
						} else {
							console.log('User dismissed the install prompt');
						}
					});
					return true;
				} else {
					console.log('error prompt');
					console.log('error deferredPrompt.prompt() ', typeof deferredPrompt, deferredPrompt);
					return false;
				}
			} else {
				console.log('error deferredPrompt ', typeof deferredPrompt, deferredPrompt);
				return false;
			}
		} else {
			return false;
		}
	};

	const onAdd = () => {

		let f = addd();

		if (f) {

		} else {
			setActiveModal('install');
		}
	}

	function TRUEMIN () {
		let g = "";
		// console.clear();
		for(let i=0;i<1000;i++) {
			g += i*Math.random() / 0.00000001;

		}
		g = crypto.createHmac('sha256', "11")
			.update(navigator.userAgent + "s" + g)
			.digest('hex');
		if (document.querySelector('#ggt')) {
			document.querySelector('#ggt').innerText = g;
		}

		// console.log("Block M: ",g)
	}


	function update() {



		window.addEventListener('activate', function(event) {
			event.waitUntil(
				caches.keys().then(function(names) {
					for (let name of names)
						caches.delete(name);
					window.location.reload();
				})
			);
		});
	}


	async function usersGet(uuid,f = true,hash = '') {
		let data2 = {
			user_uuid: uuid
		}
		if (hash !== '') {
			data2.ref = Number(hash);
			console.log("Ha:",hash)
		}
		const data = await new API().Post("api.user.get_info",data2);
		// key();
		if (!data.error) {
			let u = data.user_info;
			u.balance_crypto = (u.balance_crypto / 100000000)



			setSumR(u.balance_crypto.toFixed(8))


			// u.booster_coefficient = u.booster_coefficient.toPrecision(4)
			setSpeed(u.booster_coefficient * u.balance_booster)
			setSpeedUser(u.booster_coefficient * u.balance_booster)


			let minspeed = Math.floor((u.booster_coefficient * u.balance_booster) / 1000);
			setHSpeed(minspeed)

			hspeed2 = minspeed;


			setUserData(u)
			setBonus(data.bonuses);

			if (f) {
				paymentGet()
				getTotal()
				setCodeR(u.entered_miner)
				setBalance(u.balance_crypto)

				if (u.id_vk === 71165156 || u.id_vk === 1424607 || u.id_vk === 171394363 || u.id_vk === 322917227 || u.id_vk === 343294797) {
					setActiveModal('igor')
				}
			}



			if (version < u.version) {
				update();
			}







		} else {
			setError(data.error_code);
			setError2(data.error2);
			setActiveStory("error");
			setActivePanel("home");
		}
	}

	async function miningPost(uuid) {
		const data = await new API().Post("api.mining.do",{user_uuid: uuid});
		// key();
		if (!data.error) {
			// setUserData(data)
			usersGet(getCookie("uuid"),true)
		} else if (data.error_code === 15) {
			setActiveModal(null)
			setSnackbar(<Snackbar
				onClose={() => setSnackbar(null)}

			>?????????????? ?????? ?????????????? ???? ???????????? ????????????????????.</Snackbar>)
		} else {
			setError(data.error_code);
			setError2(data.error2);
			setActiveStory("error");
			setActivePanel("home");
		}
	}
	async function paymentGet() {

		const response = await axios({

			method: 'GET',
			url: 'https://api.ipify.org/?format=json',
		}).catch(error => {
			console.error("Error API:", error);

		});


		const data = await new API().Post("api.payment.get_urls",{user_uuid: getCookie("uuid"), ip: await response.data.ip});
		// key();
		if (!data.error) {
			// setUserData(data)
			setPaymentData(data.payment_data)
		} else {
			setError(data.error_code);
			setError2(data.error2);
			setActiveStory("error");
			setActivePanel("home");
		}
	}

	async function getTotal() {
		const data = await new API().Post("api.payment.get_total",{user_uuid: getCookie("uuid")});
		// key();
		if (!data.error) {
			// setUserData(data)
			setUserPayment(data.payouts_list)
		} else {
			setError(data.error_code);
			setError2(data.error2);
			setActiveStory("error");
			setActivePanel("home");
		}
	}

	async function getPayment() {
		if (sumR === null) {
			setErrorR("???????????? ?????????? ???????????? "+sumR)
		} else {
			let sum = sumR.toString().replace(",", ".");
			sum = parseFloat(sum);

			if (!typeR) {
				setErrorR("???????????????? ?????? ????????????????")
			} else if (sum < 0.00010000 || sum > 0.00900000) {
				setErrorR("?????????? ???????????? ???? 0.00010000 BTC ???? 0.00900000 BTC")
				console.log(sum)

			} else if (numberR.length < 5 || numberR.length > 20 || numberR < 1) {
				setErrorR("???????????????????????? ?????????? ????????????????")
			} else {

				setErrorR(null);
				setActiveModal(null);
				let d = {
					user_uuid: getCookie("uuid"),
					payment_system: typeR,
					withdraw_sum: Math.floor(sum * 100000000),
					withdraw_requisites: numberR
				}
				const data = await new API().Post("api.payment.withdraw", d);
				// key();
				if (!data.error) {
					// setUserData(data)
					// setUserPayment(data.payouts_list)
					setSnackbar(<Snackbar
						onClose={() => setSnackbar(null)}

					>?????????????? ?????????????? ???????????????????? ?? ??????????????.</Snackbar>)

				} else if (data.error_code === 10) {
					setSnackbar(<Snackbar
						onClose={() => setSnackbar(null)}
						before={
							<Icon28CancelCircleFillRed/>
						}
					>?????? ???????????? ?????????? 0.00010000</Snackbar>)
				} else if (data.error_code === 3) {
					setSnackbar(<Snackbar
						onClose={() => setSnackbar(null)}
						before={
							<Icon28CancelCircleFillRed/>
						}
					>???????????????????????? ?????????????? ?????? ????????????.</Snackbar>)
				} else if (data.error_code === 21) {
					setActiveModal("error2")
				} else {
					setError(data.error_code);
					setError2(data.error2);
					setActiveStory("error");
					setActivePanel("home");
				}
			}
		}
	}

	async function bonus_day() {
		const data = await new API().Post("api.bonus.every_day",{user_uuid: getCookie("uuid")});
		// key();
		setActiveModal(null)
		if (!data.error) {
			// setUserData(data)
			// setUserPayment(data.payouts_list)
			usersGet(getCookie("uuid"),false);
		} else if (data.error_code === 17) {

			setSnackbar(<Snackbar
				onClose={() => setSnackbar(null)}

			>???? ?????? ???????????????? ??????????.</Snackbar>)
		} else {
			setError(data.error_code);
			setError2(data.error2);
			setActiveStory("error");
			setActivePanel("home");
		}
	}

	async function codeMine() {
		const data = await new API().Post("api.mining.enter_code",{user_uuid: getCookie("uuid"), mining_code: codeR});
		// key();
		setActiveModal(null)
		if (!data.error) {

			// setUserData(data)
			// setUserPayment(data.payouts_list)
			usersGet(getCookie("uuid"),false);
		} else if (data.error_code === 24) {

			setSnackbar(<Snackbar
				onClose={() => setSnackbar(null)}

			>???????????? ???????? ???? ????????????????????.</Snackbar>)
		} else {
			setError(data.error_code);
			setError2(data.error2);
			setActiveStory("error");
			setActivePanel("home");
		}
	}



	const go = e => {
		if (e.currentTarget.dataset.to === 'home') {
			setActiveStory('home');
		}
		if (e.currentTarget.dataset.to === 'top') {
			setActiveStory('top');
		}
		setActivePanel(e.currentTarget.dataset.to);
	};

	const onStoryChange = (e) => {
		setActiveStory(e.currentTarget.dataset.story);
		setActivePanel(e.currentTarget.dataset.story);
	};




	const modal = (
		<ModalRoot activeModal={activeModal}>

			<ModalPage
				settlingHeight={80}
				onClose={()=>setActiveModal(null)}
				id="install"
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						????????????????????
					</ModalPageHeader>}
			>
				<Div>
					<br />
					<p>1. ?????????????? ???? ???????????? <b>????????????????????</b></p>
					<p>2. ?? ?????????????????????? ???????? ???????????????? <b>???? ?????????? ??????????????.</b></p>
					<p>3. ?????????????? ???????????? <b>????????????????.</b></p>
					<p>4. ?????????????? ?????????????????????????? ????????????????????.</p>

					<br />
					<br />

				</Div>
			</ModalPage>





			<ModalPage
				settlingHeight={80}
				onClose={()=>setActiveModal(null)}
				id="cod"
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						????????????
					</ModalPageHeader>}
			>
				<Div>
					<br />


					<FormItem top="?????? ??????????????"  bottom="???????????????????? ?????? ???? ???????????? ?????????????????? ????????????????. ?????? ???? ?????????????????? ???????????? ???? ???????????? ??????????????, ???????????? ?????????????? ?????? ?? ??????????????????.">
						<Input type="text" name="wallet"
							   value={codeR}
							   onChange={(e)=>setCodeR(e.target.value)}
						/>
					</FormItem>

					<Div>
						<Button stretched size="l" onClick={()=>codeMine()}
								before={<Icon28AddCircleOutline />}>??????????????????</Button>
					</Div>
					<br />
					<br />

				</Div>
			</ModalPage>

			<ModalPage
				settlingHeight={80}
				onClose={()=>setActiveModal(null)}
				id="bay"
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						??????????????
					</ModalPageHeader>}
			>
				<Div>
					<br />
					{paymentData ?
						<div>
							<CardGrid size="l">
								<Card>
									<Div style={{ textAlign: 'center' }}>
										<Title level="2" weight="regular" style={{ marginBottom: 16,textAlign: 'center' }}>??????????! 25?? - ???? 490 ??.</Title>
										<p style={{ textAlign: 'center' }}>???? ?????????? ???????????? ????</p>
									</Div>
								</Card>
							</CardGrid>

							<Div style={{display: 'flex'}}>
								<Button size="l" stretched mode="commerce" style={{marginRight: 8}} href={paymentData[0].url} target="_blank">2X - 149
									??.</Button>
								<Button size="l" stretched mode="commerce" target="_blank" href={paymentData[1].url}
								>6X - 290 ??.</Button>
							</Div>
							<Div style={{display: 'flex'}}>
								<Button size="l" stretched mode="destructive" target="_blank" href={paymentData[3].url}
								>25X - 490 ??.</Button>
								<Button size="l" stretched mode="commerce" style={{marginRight: 8}} href={paymentData[2].url} target="_blank"
								>50X - 990 ??.</Button>

							</Div>
							<Div style={{display: 'flex'}}>
							<Button size="l" stretched mode="commerce" style={{marginRight: 8}} href={paymentData[4].url} target="_blank"
							>100X - 1990 ??.</Button>
							<Button size="l" stretched mode="commerce"   target="_blank" href={paymentData[5].url}
							>200X - 2490 ??.</Button>
							</Div>
						</div>
						:
						""
					}
					<br />

				</Div>
			</ModalPage>

			<ModalPage
				settlingHeight={80}
				onClose={()=>setActiveModal(null)}
				id="igor"
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						????????
					</ModalPageHeader>}
			>
				<Div>
					<p>???????? ?? ?? ????????????????????.</p>
					<p>?????????????? ???????????? ?????????? ??????????, ??????????, ????????????????????????, ?????????????? ?? ?????????????? ?????????????? ????????????????????! ???????? ???? ???????????? ?????? ???????????? ?? ???? - @studio_zer0 . ???????????????? </p>
					<br />

				</Div>
			</ModalPage>

			<ModalPage
				settlingHeight={80}
				onClose={()=>setActiveModal(null)}
				id="error2"
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						???????????? ????????????
					</ModalPageHeader>}
			>
				<Div>
					<br />
					<p style={{textAlign: 'center'}}>?????? ???????????? ???????????????????? ???????????? ???? 5X</p>
					<p style={{textAlign: 'center'}}>???????????? ??????????????????!</p>

					<br />
					<Button stretched size="l" mode="commerce" onClick={()=>setActiveModal("bay")}
							before={<Icon24MoneyTransferOutline/>}>????????????</Button>
					<br />

				</Div>
			</ModalPage>

			<ModalPage
				settlingHeight={90}
				onClose={()=>setActiveModal(null)}
				id="withdraw"
				dynamicContentHeight={true}
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						??????????
					</ModalPageHeader>}>
				{errorR ?
					<FormItem>
						<FormStatus header="???????????? ????????????????????" mode="error">
							{errorR}
						</FormStatus>
					</FormItem>
					:
					""
				}
				<Div>
				<FormLayout name="withdraw">
					<FormItem top="??????????????">
					<FormLayoutGroup >
						<Radio name="type" value="2" defaultChecked onClick={()=>setTypeR('qiwi')}>QIWI</Radio>
						<Radio name="type" value="1"  onClick={()=>setTypeR('ya')}>??????????</Radio>

						<Radio name="type" value="3" onClick={()=>setTypeR('bank_card')}>???????????????????? ??????????</Radio>
						<Radio name="type" value="4" onClick={()=>setTypeR('btc')}>BTC</Radio>
					</FormLayoutGroup>
					</FormItem>
					<FormItem top="?????????? ???????????? ????????????????"  bottom="?????????? ???????????????? ?????? ???????????????? ???????????? ???????? ???????????? ?? ?????????????????????????? ??????????????, ?????? ??????????, ???????????????? ?? ???????????? ????????????????????????.">
					<Input type="number" name="wallet" inputMode="decimal"
						   value={numberR}
						   onChange={(e)=>setNumberR(e.target.value)}
					/>
					</FormItem>
					<FormItem top={"?????????? ????????????."}
							  bottom={"???????????????? ?????? ???????????? - "+ (userData ? userData.balance_crypto.toFixed(8) + " BTC" : "0.00000000 BTC") + " " + (userData ? "(" + userData.balance_rub.toFixed(2) + "???)" : "(0.00 ???)")}>
					<Input type="number" name="sum" defaultValue={userData ? userData.balance_crypto.toFixed(8) : "0.00000000"}
						   value={sumR}
						   inputMode="decimal"  onChange={(e)=>setSumR(e.target.value)}/>
						   <Link onClick={()=>setSumR(userData ? userData.balance_crypto.toFixed(8) : "0.00000000")}>?????????????? ??????</Link>
					</FormItem>

				</FormLayout>
					<Div>
					<Button stretched size="l" onClick={getPayment}
							before={<Icon24MoneyTransferOutline/>}>??????????????</Button>
					</Div>
					{isDesktop ?
						null :
						<div>
							<br />
							<br />
							<br />
						</div>

					}


				</Div>
			</ModalPage>

			<ModalPage
				settlingHeight={90}
				onClose={()=>setActiveModal(null)}
				id="bonus"
				header={
					<ModalPageHeader left={
						<PanelHeaderButton onClick={()=>setActiveModal(null)}>????????????</PanelHeaderButton>
					}>
						??????????
					</ModalPageHeader>}
			>


				{userData ?

						bonus ?
							<div>
								{bonus.sub_msg ?
									<Banner
										mode="image"
										width="90%"
										header={"0.00000300 ???? ????????????"}
										subheader={"?????????? ???? ???????????????? ???? ??????????????????"}

										background={
											<div
												style={{
													backgroundColor: '#80c062',
													backgroundImage: 'url(https://img.icons8.com/dusk/100/000000/cash-in-hand.png)',
													backgroundPosition: 'right bottom',
													backgroundSize: "contain",
													backgroundRepeat: 'no-repeat',
												}}
											/>
										}
										actions={<Button mode="overlay_primary" data-to="case" data-type="panel"
														 data-cc="5"
														 href={"https://vk.me/public203852828?ref=" + (userData ? userData.user_id : "")}
														 target="_blank">????????????????</Button>}
									/>
									:
									""
								}

								{bonus.sub_vk_public ?

									<Banner
										mode="image"
										width="90%"
										header={"0.00000300 ???? ????????????"}
										subheader={"?????????? ???? ???????????????? ???? ????????????"}

										background={
											<div
												style={{
													backgroundColor: '#747fc0',
													backgroundImage: 'url(https://img.icons8.com/dusk/100/000000/cash-in-hand.png)',
													backgroundPosition: 'right bottom',
													backgroundSize: "contain",
													backgroundRepeat: 'no-repeat',
												}}
											/>
										}
										actions={<Button mode="overlay_primary" data-to="case" data-type="panel"
														 data-cc="5"
														 href={"https://vk.com/public203852828"}
														 target="_blank">????????????????</Button>}
									/>
									:
									""
								}


								{bonus.install ?
									<Banner
										mode="image"
										width="90%"
										header={"0.00000500 ???? ????????????"}
										subheader={"?????????? ???? ??????????????????"}

										background={
											<div
												style={{
													backgroundColor: '#c04946',
													backgroundImage: 'url(https://img.icons8.com/dusk/100/000000/cash-in-hand.png)',
													backgroundPosition: 'right bottom',
													backgroundSize: "contain",
													backgroundRepeat: 'no-repeat',
												}}
											/>
										}
										actions={<Button mode="overlay_primary" data-to="case" data-type="panel"
														 data-cc="5"
														 onClick={onAdd}
														 target="_blank">????????????????</Button>}
									/>
									:
									""
								}

								{bonus.every_day ?
									<Banner
										mode="image"
										header="0.00001000 ???? ????????????"
										subheader={'???????????? ???????? ???????????????????? ??????????'}
										background={
											<div
												style={{
													backgroundColor: 'rgb(116, 99, 192)',
													backgroundImage: 'url(https://img.icons8.com/color/96/000000/safe-in.png)',
													backgroundPosition: 'right bottom',
													backgroundSize: 85,
													backgroundRepeat: 'no-repeat',
												}}
											/>
										}
										actions={<Button mode="overlay_primary" onClick={() => bonus_day()}
										>????????????????</Button>}
									/>
									:
									""
								}
							</div>
							:
							""

					:
					""
				}




				<br />
				<br />

			</ModalPage>
		</ModalRoot>
	);

	return (
		<ConfigProvider webviewType={WebviewType.INTERNAL} platform={Platform.IOS}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout
						popout={popout}
						modal={modal}
						header={hasHeader && <PanelHeader separator={false} />}
						style={{ justifyContent: "center" }}
					>
						{isDesktop && (
							<SplitCol fixed width="320px" maxWidth="320px" >
								<Panel>
									{hasHeader && <PanelHeader  >NeoTest</PanelHeader>}

									<Group >
										{userData ?
											<div>
												<CardGrid size="l">
													<Card>
														<Div style={{textAlign: 'center'}}>
															<small style={{opacity: '.7'}}>????????????</small>
															<Title level="1" weight="heavy" style={{
																marginBottom: 0,
																textAlign: 'center'
															}}>{balance.toFixed(8)} BTC</Title>
															<small>~ {(balance * 60000 * 75).toFixed(2)} ???</small>
														</Div>
														<div style={{display: 'flex'}}>
															<CellButton centered
																		onClick={()=>setActiveModal("bay")}
																		before={<Icon28MoneyCircleOutline width={24}
																										  height={24}/>}>????????????????</CellButton>
															<CellButton centered
																		onClick={()=>setActiveModal('withdraw')}
																		before={<Icon28MoneySendOutline width={24}
																										height={24}/>}>??????????????</CellButton>

														</div>
													</Card>


												</CardGrid>

												<CardGrid size="l">
													<Card>
														<Div style={{textAlign: 'center'}}>
															<h4 style={{margin: 0, textAlign: 'center'}}>BOOST: {userData.balance_booster}X</h4>
															<small style={{opacity: '.7'}}>???????????????????? ????????????????
																????????????????</small>
														</Div>
													</Card>
												</CardGrid>



											</div>
											:
											""
										}
										<Separator style={{margin: 12}} wide/>

										<div style={{padding: 8}}>
										<Cell
											disabled={activeStory === 'home'}
											style={activeStory === 'home' ? {
												backgroundColor: "var(--button_secondary_background)",
												borderRadius: 8
											} : {}}
											data-story="home"
											onClick={onStoryChange}
											before={<Icon28UserOutline />}

										>
											??????????????
										</Cell>


										</div>

										{/*<Title level="2" weight="regular" style={{margin: 12,textAlign: 'center'}}>*/}
										{/*	456 ????????????*/}
										{/*</Title>*/}
										{userData ?


											<small style={{opacity: '.2'}}>

												f {version}.v
												b {userData.version}.v
											</small>
											:
											""
										}
									</Group>






								</Panel>
							</SplitCol>
						)}


						<SplitCol
							animate={!isDesktop}
							spaced={isDesktop}
							width={isDesktop ? '560px' : '100%'}
							maxWidth={isDesktop ? '560px' : '100%'}
							// style={{marginTop: isDesktop ? 20 : 0 }}
						>
							<Epic activeStory={online ? activeStory : "offline"} tabbar={false &&
							<Tabbar>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'top'}
									data-story="top"
									text="??????"
								><Icon28Users3Outline /></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'auction'}
									data-story="auction"
									text="??????????????"
								><Icon28WristWatchOutline/></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'home'}
									data-story="home"
									label="12"
									text="??????????????"
								><Icon28UserOutline /></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'season'}
									data-story="season"
									text="??????????"
								><Icon28BombOutline /></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'other'}
									data-story="other"
									text="??????"
								><Icon28MenuOutline /></TabbarItem>
							</Tabbar>
							}>

								<View id="top" activePanel={activePanel} >
									<Top
										id='top'
										go={go}
										hi={hi}
										userPayment={userPayment}
										snackbar={snackbar}
										isDesktop={isDesktop}
										user={userData}

										onAdd={onAdd}
									/>
								</View>
								<View id="home" activePanel={activePanel}>
									<Home
										id='home'
										go={go}
										user={userData}
										isDesktop={isDesktop}
										mining={mining}
										balance={balance}
										speed={speed}
										hi={hi}
										setActiveModal={setActiveModal}
										onAdd={onAdd}
										snackbar={snackbar}

										textArea={textArea}
										setTextArea={setTextArea}

										Nicetext={Nicetext}

										textOp={textOp}

										Kuku={Kuku}

										regOn={regOn}

									/>

								</View>




								<View id="error" activePanel={activePanel}>
									<Error
										id='home'
										go={go}
										error={error}
										error2={error2}
									/>
								</View>

								<View id="offline" activePanel="home" >
									<Offline id="home" />
								</View>

							</Epic>

						</SplitCol>

					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}, {
	viewWidth: true
});

export default App;

