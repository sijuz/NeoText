import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import './Persik.css';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Group} from "@vkontakte/vkui";


const Persik = props => (
	<Panel id={props.id}>

		<div style={{height: '100vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			<Group >
		<Div style={{height: "90vh"}}>
			<Placeholder
				style={{height: "100%"}}
				icon={<Icon56ErrorOutline />}
				header="Нет подключения к интернету"
			>
				Вернитесь когда появится интернет
			</Placeholder>
		</Div>
		</Group>
		</div>
	</Panel>
);



export default Persik;
