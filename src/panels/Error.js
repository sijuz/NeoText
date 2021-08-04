import React from 'react';
import {  Div, PanelHeader, Panel, CardGrid, Card, Button } from '@vkontakte/vkui';


import Icon28BugOutline from '@vkontakte/icons/dist/28/bug_outline';

const Error = ({ id, go, error,error2}) => {
	return (
	<Panel id={id}>

		<PanelHeader
			separator={false}
			>
			Ошибка
		</PanelHeader>


		<Div separator={false} style={{textAlign: "center", marginTop: '15px'}}>
			<Icon28BugOutline width={56} height={56} style={{margin: "0 auto"}} />

			<h1>Ошибка загрузки</h1>
			<h3>{error !== '' ? "Номер ошибки: #"+error : ''}</h3>
			<CardGrid size="l">
				<Card>
					<p style={{textAlign: "left",margin: 20}}>{error2}</p>
				</Card>
			</CardGrid>
			<Button size="l" onClick={()=>document.location.reload()} style={{marginTop: "20px"}}>Перезагрузить</Button>

		</Div>
	</Panel>
);
};

export default Error;
