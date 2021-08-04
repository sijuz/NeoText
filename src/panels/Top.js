import React from 'react';
import PropTypes from 'prop-types';

import './Persik.css';
import {
	Avatar,
	SimpleCell,
	Spinner,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Div,
	PanelHeaderButton,
	PanelHeaderContent,
	List,
	RichCell,
	Button,
	Group,
	Link,
	Footer,
	Card,
	FormItem,
	Textarea,
	CardGrid
} from "@vkontakte/vkui";
import {Icon28ChevronBack, Icon28LogoVk, Icon28RefreshOutline} from "@vkontakte/icons";

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}



const Top = props => (
	<Panel id={props.id}>
		<PanelHeader

		><PanelHeaderContent>Установка</PanelHeaderContent></PanelHeader>
		<Group style={{minHeight: '20vh'}}>
			<CardGrid size="l">
				<Card>



					<Div style={{display: 'flex'}}>
						<Button size="l" stretched style={{ marginRight: 8 }} onClick={props.onAdd}>Установить приложение</Button>
					</Div>

				</Card>
			</CardGrid>
		</Group>

	</Panel>
);
export default Top;
