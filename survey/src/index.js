import React from 'react';
import { render } from 'react-dom';
import { store, persistor } from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css';
import './style/css/bootstrap_parvan_override.css';
import 'font-awesome/css/font-awesome.min.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from './components/common/Loading';
import registerServiceWorker from './registerServiceWorker';
import { IntlProvider, addLocaleData } from 'react-intl';
import fa from 'react-intl/locale-data/fa';

addLocaleData([...fa]);

const messages = {
	fa: {
		"gender": "جنسیت",
		"gender.MALE":"مذکر",
		"gender.FEMALE":"مونث",		
		"edu": "میزان تحصیلات",
		"edu.DI": "دیپلم",
		"edu.BS": "لیسانس",
		"edu.MS": "فوق‌لیسانس",
		"edu.DR": "دکترا",
		"schoolDiscipline": "رشته تحصیلی دبیرستان",
		"univDiscipline": "رشته تحصیلی دانشگاه",
		"cityBirth": "شهر محل تولد",
		"cityResidence": "شهر محل زندگی",
		"numberOfChildren": "تعداد فرزندان",
		"motherTongue": "زبان مادری",
		"mentalIllnessHistory": "سابقه مراجعه به روانشناس دارم",
		"physicalIllnessHistory": "سابقه مراجعه به روانشناس دارم",
		"drugUseHistory": "سابقه مصرف دارو دارم",
		"willingnessToParticipate": "مایلم از نتایج آزمون های من در تحقیقات استفاده شود",
		"willingnessToParticipate.true": "بله",		
		"willingnessToParticipate.false": "خیر",				
		"age": "سن",
		"maritalStatus": "وضعیت تاهل",
		"maritalStatus.SINGLE": "مجرد",
		"maritalStatus.MARRIED":"متاهل",
		"maritalStatus.DIVORCED":"جدا شده",                                
		"name": "نام",
		"username": "نام‌کاربری",
		"email": "ایمیل",
		"code.2000": "نام کاربری یا گذرواژه اشتباه است",
		"myProfile": "پروفایل من",		
	}
}

render(
	<Provider store={store}>
		<PersistGate loading={<Loading />} persistor={persistor}>
			<IntlProvider locale={'fa'} messages={messages['fa']}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</IntlProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();