import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";
import {Persik} from "./Persik.js";


const getRandomImage = async () => {
    const response = await fetch("https://api.unsplash.com/photos/random?query=car&client_id=sfW_oB40Lf4_IGbA-QcOyTyx5x21QX8Uq2QM_ygp0mo");
    const data = await response.json();
    return data.urls.regular;
}
export const Home = ({id, fetchedUser}) => {
    const {photo_200, city, first_name, last_name} = {...fetchedUser};
    const routeNavigator = useRouteNavigator();
    const customImage = Persik;
    const stories = async () => {
        const image = await getRandomImage();
        await bridge.send('VKWebAppShowStoryBox', {
            background_type: 'image',
            url: image
        }).then((data) => {
            if (data.code_data) {
                console.log(data);
            }
        })
    }
    return (
        <Panel id={id}>
            <PanelHeader>Какая ты машина по мнению Тамаева</PanelHeader>
            {fetchedUser && (
                <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
                    <Cell before={photo_200 && <Avatar src={photo_200}/>} subtitle={city?.title}>
                        {`${first_name} ${last_name}`}
                    </Cell>
                </Group>
            )}
            <img
                src={customImage}
                alt="Custom Car"
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '500px',
                    marginBottom: '20px'
                }}
            />
            <Group header={<Header mode="secondary">НАЖМИ И УЗНАЙ</Header>}>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={() => stories()}>
                        Какая я машина
                    </Button>
                </Div>
            </Group>
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};
