/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/07/29.
 */
import Forbidden from '../data/forbidden.js'
 import { Base64 } from 'js-base64'
// 国际节日
export const GLOBAL_HOLIDAY = {
	'01-01': '元旦',
	'02-14': '情人',
	'05-01': '劳动',
	'06-01': '儿童',
	'10-01': '国庆',
	'12-25': '圣诞'
};
const weekday = new Array(7);
weekday[0] = "星期日";
weekday[1] = "星期一";
weekday[2] = "星期二";
weekday[3] = "星期三";
weekday[4] = "星期四";
weekday[5] = "星期五";
weekday[6] = "星期六";

// 传统节日
const TRADITIONAL_HOLIDAY = {
	除夕: ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
	春节: ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
	元宵: ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
	清明: ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
	端午: ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
	中秋: ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
	重阳: ['2015-10-21', '2016-10-09', '2017-10-28', '2018-10-17', '2019-10-07', '2020-10-25']
};

// 放假日
const REST_DAYS = [
	'2017-10-01',
	'2017-10-02',
	'2017-10-03',
	'2017-10-04',
	'2017-10-05',
	'2017-10-06',
	'2017-10-07',
	'2017-10-08'
];

// 工作日
const WORK_DAYS = ['2017-09-30'];

export function _getTraditionalHoliday() {
	const HOLIDAY_TEMP = {};

	const keys = Object.keys(TRADITIONAL_HOLIDAY);
	keys.forEach(k => {
		const arr = TRADITIONAL_HOLIDAY[k];
		arr.forEach(i => {
			HOLIDAY_TEMP[i] = k;
		});
	});
	return HOLIDAY_TEMP;
}

export function _isDate(obj) {
	const type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
	return type === '[object date]';
}

/**
 * 检测Hash
 *
 * @method _checkHash
 * @private
 */
export function _checkHash(url, hash) {
	return url && url.match(/#/) && url.replace(/^.*#/, '') === hash;
}

/**
 * 获取当前日期的毫秒数
 * @method getTime
 * @param {String} date
 * @return {Number}
 */
export function getTime(date) {
	if (_isDate(date)) {
		return new Date(date).getTime();
	} else {
		try {
			return new Date(date.replace(/-/g, '/')).getTime();
		} catch (e) {
			return 0;
		}
	}
}

export function _isInRange(range, date) {
	const start = getTime(range[0]);
	const end = getTime(range[1]);
	const d = getTime(date);
	return start <= d && end >= d;
}

export function _isInSelectRange(range, date) {
	const start = getTime(range[0]);
	const end = getTime(range[1]);
	const d = getTime(date);
	return start < d && end > d;
}

export function _fixNum(num) {
	return (num < 10 ? '0' : '') + num;
}

/**
 * 是否是周末
 * @method isWeekend
 * @param {String} date
 * @return {Boolean}
 */
export function _isWeekend(date) {
	const day = new Date(date.replace(/-/g, '/')).getDay();
	return day === 0 || day === 6;
}

/**
 * 是否是今天
 * @method isToday
 * @param {String} date
 * @return {Boolean}
 */
export function _isToday(today, date) {
	return getTime(today) === getTime(date);
}

/**
 * 检查是否是闰年
 * @method _checkLeapYear
 * @param {Number} y 年份
 * @param {Date} t today
 * @protected
 */
export function _getMonthDays(y, t) {
	const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const year = y || t.getFullYear();
	let isLeapYear = false;

	if (year % 100) {
		isLeapYear = !(year % 4);
	} else {
		isLeapYear = !(year % 400);
	}

	if (isLeapYear) {
		MONTH_DAYS[1] = 29;
	} else {
		MONTH_DAYS[1] = 28;
	}
	return MONTH_DAYS;
}

/**
 * 当月1号前面有多少空格
 * @method _getPadding
 * @protected
 */
export function _getPadding(year, month) {
	const date = new Date(year + '/' + month + '/1');
	return date.getDay();
}

export function _unique(array) {
	return Array.prototype.filter.call(array, function(item, index) {
		return array.indexOf(item) === index;
	});
}

export function getToDay() {
	return (
		new Date().getFullYear() +
		'-' +
		_fixNum(new Date().getMonth() + 1) +
		'-' +
		_fixNum(new Date().getDate())
	);
}

export function getNowTime() {
	let myTime = new Date();
	let year = myTime.getFullYear();
	let month = myTime.getMonth() + 1;
	let day = myTime.getDate();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	return year + '-' + month + '-' + day;
}
/**
 * 获取日期详情
 * @param {Object} date 非必须，不传为当日时间
 * @return {Object}
 * YYMMDDhhmm_text 2020年4月5日13时09分
 * YYMMDDhhmmss: 2020-04-05 13:09:12
 * YYMMDDhhmm: 2020-04-05 13:09
 * YYMMDD_text: 2020年4月5日
 * YYMMDD: 2020-04-05
 * YY: 2020 number
 * MM: 4 number
 * DD: 5 bunber
 * WEEKDAY:	星期日
 */
export function getDetailTime(date) {
	let today = null;
	if (date) {
		today = new Date(date);
	} else {
		today = new Date();
	}
	let y = today.getFullYear();
	let m = today.getMonth() + 1;
	let d = today.getDate();
	let h = today.getHours();
	let min = today.getMinutes();
	let second = today.getSeconds();
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	min = min < 10 ? '0' + min : min;
	let YYMMDDhhmm_text = y + '年' + m + '月' + d + '日 ' + h + '时' + min + '分';
	let YYMMDDhhmmss = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + second;
	let YYMMDDhhmm = y + '-' + m + '-' + d + ' ' + h + ':' + min;
	let YYMMDD = y + '-' + m + '-' + d;
	let YYMMDD_text = y + '年' + m + '月' + d + '日';
	let obj = {
		YYMMDDhhmm_text: YYMMDDhhmm_text,
		YYMMDDhhmmss: YYMMDDhhmmss,
		YYMMDDhhmm: YYMMDDhhmm,
		YYMMDD_text: YYMMDD_text,
		YYMMDD: YYMMDD,
		YY: y,
		MM: m,
		DD: d,
		hh: h,
		mm: min,
		ss: second,
		WEEKDAY: weekday[today.getDay()]
	};
	return obj;
}

export function getWeekRows(
	y,
	m,
	today,
	dateRange,
	departDate,
	arriveDate,
	selectedNote,
	descList
) {
	const monthDays = _getMonthDays(y, today);
	const padding = _getPadding(y, m, 7);
	const num = monthDays[m - 1] + padding;
	const rows = Math.ceil(num / 7);
	const remain = num % 7;
	const rowsData = [];

	for (let i = 1; i <= rows; i++) {
		const cells = [];

		for (let j = 1; j <= 7; j++) {
			let cell = {};
			// 前后空格
			if ((i === 1 && j <= padding) || (remain && i === rows && j > remain)) {
				cell.isEmpty = true;
			} else {
				const d = (i - 1) * 7 + j - padding;
				const date = y + '-' + _fixNum(m) + '-' + _fixNum(d);
				let cls = [];
				let ref = '';
				const cellClass = [];
				const isInRange = _isInRange(dateRange, date);
				let disabled = false;
				const global = _fixNum(m) + '-' + _fixNum(d);
				let note = '';
				let ext = '';
				let fd = 1;

				if (descList && descList.length > 0) {
					const nowDesc = descList.filter(item => item.date === date);
					if (nowDesc && nowDesc.length > 0) {
						ext = nowDesc[0].value;
						fd = nowDesc[0].dayFlag;
						if (nowDesc[0].emphasize) {
							cls.push('calendar-holiday');
						}
					}
				}

				// 国际节日
				if (GLOBAL_HOLIDAY[global]) {
					note = GLOBAL_HOLIDAY[global];
					cls.push('calendar-holiday');
				}

				const tHoliday = _getTraditionalHoliday()[date];

				// 传统节日
				if (tHoliday) {
					note = tHoliday;
					cls.push('calendar-holiday');
				}
				// 放假日
				if (REST_DAYS.indexOf(date) > -1) {
					cls.push('calendar-holiday');
				}

				// 工作日
				if (WORK_DAYS.indexOf(date) > -1) {
					cls.push('calendar-work');
				}

				// 周末
				if (_isWeekend(date)) {
					cls.push('calendar-holiday');
				}

				// 今天
				if (_isToday(today, date)) {
					cls.push('calendar-today');
					note = '今天';
				}

				// 不在日期范围内
				if (!isInRange) {
					disabled = true;
				}

				if (disabled) {
					cls = [];
					cls.push('calendar-disabled');
					cellClass.push('cell-disabled');
				}

				if (!ext && disabled && isInRange) {
					ext = '不可选';
				}

				if (parseInt(fd) === 4) {
					cellClass.push('item-day-good');
				}

				if (parseInt(fd) === 0 || parseInt(fd) === 1) {
					cellClass.push('item-day-bad');
				}

				if (departDate === date || arriveDate === date) {
					note = departDate === date ? selectedNote[0] : selectedNote[1];
					ref = departDate === date ? 'departDate' : 'arriveDate';
					if (departDate === arriveDate && selectedNote.length >= 3) {
						note = selectedNote[2];
					}
					cls.push('item-text-selected');
					if (cellClass[0] === 'item-day-good' || cellClass[0] === 'item-day-bad') {
						cellClass[0] = 'item-row-selected';
					} else {
						cellClass.push('item-row-selected');
					}
				}

				if (departDate && arriveDate && _isInSelectRange([departDate, arriveDate], date)) {
					cellClass.push('calendar-day-include');
				}

				cell = {
					isEmpty: false,
					ref,
					cls: _unique(cls).join(' '),
					cellClass: _unique(cellClass).join(' '),
					note: note,
					date: date,
					ext: ext,
					disabled: disabled,
					text: d,
					fd: fd
				};
			}
			cells.push(cell);
		}

		rowsData.push(cells);
	}

	return rowsData;
}

export function generateDateCell({
	range,
	today,
	departDate,
	arriveDate,
	selectedNote,
	descList
}) {
	const start = new Date(range[0].replace(/-/g, '/'));
	const end = new Date(range[1].replace(/-/g, '/'));
	const startYear = start.getFullYear();
	const startMonth = start.getMonth() + 1;
	const endYear = end.getFullYear();
	const endMonth = end.getMonth() + 1;

	const l = (endYear - startYear) * 12 + endMonth - startMonth + 1;
	let y = startYear;
	let n = startMonth;
	const months = [];

	for (let i = 0; i < l; i++) {
		if (n > 12) {
			n = 1;
			y++;
		}
		months.push({
				title: `${y}-${_fixNum(n)}`
			},
			...getWeekRows(y, n, today, range, departDate, arriveDate, selectedNote, descList)
		);
		n++;
	}
	return months;
}

/**
 * 秒转时分秒
 * @param {Number} value 秒
 * @return {Object}
 */
export function formatSeconds(value) {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var resultText = "" + parseInt(secondTime) + "秒";
	var secondStr = "00"
	var minuteStr = "00"
	var hourStr = ""
	if (minuteTime > 0) {
		resultText = "" + parseInt(minuteTime) + "分" + resultText;
	}
	if (hourTime > 0) {
		resultText = "" + parseInt(hourTime) + "小时" + resultText;
	}
	if (secondTime >= 0 && secondTime < 10) {
		secondStr = "0" + parseInt(secondTime)
	} else {
		secondStr = parseInt(secondTime) + ''
	}
	if (minuteTime >= 0 && minuteTime < 10) {
		minuteStr = '0' + parseInt(minuteTime)
	} else {
		minuteStr = parseInt(minuteTime) + ''
	}
	if (hourTime >= 0 && hourTime < 10) {
		hourStr = '0' + parseInt(hourTime)
	} else {
		hourStr = parseInt(hourTime) + ''
	}

	return {
		hourTime: parseInt(hourTime), // 5
		hourStr: hourStr, // "09"
		minuteTime: parseInt(minuteTime), // 4
		minuteStr: minuteStr, // "01"
		secondTime: parseInt(secondTime), // 19
		secondStr: secondStr, // "19"
		resultText: resultText, // 3小时4分8秒
	};
}

/**
 * 两个数之间的随机整数
 * @param {Number} Min
 * @param {Number} Max
 * @returns {Number}
 */
export function GetRandomNum(Min, Max) {
	var Range = Max - Min
	var Rand = Math.random()
	return Min + Math.round(Rand * Range)
}

// 日期处理函数，将返回的201810101000 处理成2018-10-10 10:00
export function dateNumFormat(aa) {
	if (typeof aa === 'number') aa = aa.toString()
	if (aa) {
		var bb = aa.substring(0, 4);
		var cc = aa.substring(4, 6);
		var dd = aa.substring(6, 8);
		var ee = aa.substring(8, 10);
		var ff = aa.substring(10);
		let gg = bb + "-" + cc + "-" + dd + " " + ee + ":" + ff;
		return gg;
	}
}
// 日期处理函数，将返回的2018-10-10 10:00 处理成201810101000
export function dateFormartToNum(aa) {
	if (aa) {
		var bb = aa.substring(0, 4);
		var cc = aa.substring(5, 7);
		var dd = aa.substring(8, 10);
		var ee = aa.substring(11, 13);
		var ff = aa.substring(14);
		let gg = bb + "" + cc + "" + dd + "" + ee + "" + ff;
		return parseInt(gg);
	}
}

/**
 * 验证是否是日期对象
 */
export function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime())
}

/**
 * 处理替换文字 凶 --> 逆
 * @param {Object} params
 */
export function formatXiong(params) {
	let result = ''
	result = params.replace('凶', '逆')
	return result
}

/**
 * 判断输入是否是表情
 * @param {Object} substring
 * @return {Boolean} true 有 false 没有
 */
export function isEmojiCharacter(substring) {
	for (var i = 0; i < substring.length; i++) {
		var hs = substring.charCodeAt(i);
		if (0xd800 <= hs && hs <= 0xdbff) {
			if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
				if (0x1d000 <= uc && uc <= 0x1f77f) {
					return true;
				}
			}
		} else if (substring.length > 1) {
			var ls = substring.charCodeAt(i + 1);
			if (ls == 0x20e3) {
				return true;
			}
		} else {
			if (0x2100 <= hs && hs <= 0x27ff) {
				return true;
			} else if (0x2B05 <= hs && hs <= 0x2b07) {
				return true;
			} else if (0x2934 <= hs && hs <= 0x2935) {
				return true;
			} else if (0x3297 <= hs && hs <= 0x3299) {
				return true;
			} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
				hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
				hs == 0x2b50) {
				return true;
			}
		}
	}
}

/**
 * 是否存在违禁词 
 * @param {type} reply = [value] 
 * @return {Boolean} 存在返回true 不存在返回false 
 */
export function grepReplyMsg(reply) {
	let forbidden_data
	// 是否存在key 且值的length 不为空 如果是 使用缓存 如果不是 构造数据
	uni.getStorage({
		key: 'forbidden',
		success: (res) => {
			forbidden_data = res.data
		},
		fail: () => {
			
		}
	})
	if (!forbidden_data) {
		forbidden_data = Forbidden.forbiddenList()
	}
	
	// 构造数据的方案 生成违禁词数据  base64 js 模块
	let data = forbidden_data.map((v) => {
		return Base64.decode(v).slice(0, -1); // base64方案处理
	})
	uni.setStorage({
		key: 'forbidden',
		data: data
	})
	
	return data.some((v, k) => {
		if (v) {
			return reply.indexOf(v) > -1 ? true : false
		} else {
			return false
		}
	})
}
