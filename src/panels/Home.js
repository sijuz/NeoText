import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';



import './Persik.css';
import {
	Banner,
	Card,
	CardGrid, CardScroll, CellButton, CustomSelectOption, Epic, Footer, FormItem, Gallery, Input, Link,
	PanelHeaderButton, PanelHeaderContent,
	Progress, RichCell, Select,
	Separator, SimpleCell,
	Spinner,
	Tabs,
	TabsItem, Textarea,
	Title
} from "@vkontakte/vkui";
import {
	Icon16Market,
	Icon16Users, Icon28AddCircleOutline, Icon28ArticleOutline,
	Icon28BrainOutline, Icon28EmployeeOutline,
	Icon28GiftOutline, Icon28LogoVk,
	Icon28MoneyCircleOutline,
	Icon28MoneyHistoryBackwardOutline,
	Icon28MoneyRequestOutline,
	Icon28MoneySendOutline,
	Icon28RefreshOutline,
	Icon28ViewOutline, Icon28VoiceOutline,
	Icon56SchoolOutline
} from '@vkontakte/icons';
import { Icon36HomeOutline } from '@vkontakte/icons';
import { Icon28LightbulbCircleFillYellow } from '@vkontakte/icons';
import { Icon28SnowflakeOutline } from '@vkontakte/icons';
import { Icon28LightbulbStarOutline } from '@vkontakte/icons';

const Home = props => (
	<Panel id={props.id}>
		<PanelHeader




		>
			Главная
		</PanelHeader>

		<Group>

			<div>

				<div>


					<CardGrid size="l">
						<Card>

							<Div style={{display: 'flex'}}>
								<Button size="l" stretched style={{ marginRight: 8 }} onClick={props.Kuku} disabled={props.regOn}>{props.regOn ? "Говорите" : <Icon28VoiceOutline  />}</Button>
							</Div>


								<FormItem top="Текст для разбора">
									<Textarea placeholder="Я хочу купить квартиру в кредит" value={props.textArea} onChange={(e)=>props.setTextArea(e.target.value)} />
								</FormItem>

							<Div style={{display: 'flex'}}>
								<Button size="l" stretched style={{ marginRight: 8 }} onClick={()=>props.Nicetext(props.textArea)} disabled={props.regOn}>Разобрать</Button>
							</Div>

						</Card>
					</CardGrid>

					<Header mode="secondary">Разбор</Header>

					<CardGrid size="l">
						<Card>
							{props.textOp ?
								<div>
									{/*{props.textOp.addr_extractor.value ?*/}
									{/*	<RichCell*/}

									{/*		// caption={props.textOp.addr_extractor.value}*/}
									{/*		after={props.textOp.addr_extractor.type ? props.textOp.addr_extractor.type : "" + " "+props.textOp.addr_extractor.value ? props.textOp.addr_extractor.value : ""}*/}
									{/*	>*/}
									{/*		Адрес*/}
									{/*	</RichCell>*/}
									{/*	:*/}
									{/*	""*/}
									{/*}*/}

									{props.textOp.dates.day ?
										<RichCell

											after={props.textOp.dates.day ? props.textOp.dates.day + "." : "" + props.textOp.dates.month ? props.textOp.dates.month+ "." : "" + props.textOp.dates.year ? props.textOp.dates.year : ""}
										>
											Дата
										</RichCell>
										:
										""
									}

									{props.textOp.money_extractor.amount ?
										<RichCell
											after={props.textOp.money_extractor.amount + " " + props.textOp.money_extractor.currency}
										>
											Цена
										</RichCell>
										:
										""
									}
									{props.textOp.yar.match_fact ?
										<RichCell
											after={props.textOp.yar.match_fact}
										>
											Действие
										</RichCell>
										:
										""
									}


								</div>
								:
								""
							}

						</Card>
					</CardGrid>
					<Header mode="secondary">Разбор JSON</Header>
					<CardGrid size="l">
						<Card>



							<Div style={{display: 'flex'}}>
								<pre>
								{props.textOp !== "" ? JSON.stringify(props.textOp,undefined, 4) : ""}
								</pre>
							</Div>

						</Card>
					</CardGrid>




			</div>


			</div>


			{props.snackbar}
		</Group>


	</Panel>
);

export default Home;
