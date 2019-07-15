import DefaultLayout from '~/layouts/Default';
import NavBar from '~/components/NavBar';
import MastHead from '~/components/MastHead';
import Welcome from '~/components/Welcome';
import Inex from '~/components/Inex.vue';
import Visualization from '~/components/Visualization';
import VisualizationSection from '~/components/VisualizationSection';
import Milestone from '~/components/Milestone';
import MilestoneSection from '~/components/MilestoneSection';
import Footer from '~/components/Footer';
import Social from '~/components/Social';

import config from '~/data/config.js';
import data from '~/data/data.json';
import milestones from '~/data/milestones.json';
import tooltips from '~/data/tooltips.json';

export default function (Vue, { router, head, isClient }) {
	Vue.component('Layout', DefaultLayout);
	Vue.component('NavBar', NavBar);
	Vue.component('MastHead', MastHead);
	Vue.component('Welcome', Welcome);
	Vue.component('Inex', Inex);
	Vue.component('Visualization', Visualization);
	Vue.component('VisualizationSection', VisualizationSection);
	Vue.component('Milestone', Milestone);
	Vue.component('MilestoneSection', MilestoneSection);
	Vue.component('Footer', Footer);
	Vue.component('Social', Social);

	Vue.prototype.$config = config;
	Vue.prototype.$d = data;
	Vue.prototype.$milestones = milestones;
	Vue.prototype.$tooltips = tooltips;
	Vue.prototype.$util = {
		groupNums(v, ns) {
			var s = ['', 'e', 'M', 'Mrd'];
			var i = 0;
			v = Number(v);
			while (ns && i < s.length && v > 1000) {
				v /= 1000;
				i++;
			}
			v = Math.round(v);
			var vs = (v + '').replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) { return $0 + ' ' });
			return (vs + ' ' + s[i] + ' Ft').trim();
		}
	};

	// disabling modules if there's no data
	if (milestones.length == 0) {
		config.modules.milestones = false;
	}
	Object.keys(data).forEach(year => {
		if (!data[year].income) {
			config.modules.income = false;
		}
	});
	if (!config.modules.income) {
		config.modules.inex = false;
	}
}
