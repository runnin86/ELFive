/*
 * action会受到store作为它的第一个参数
 * 在store里我们只需要dispatch(在有些情况下需要state)
 * 我们可以利用ES6的结构(destructuring)语法来简化参数的使用
 */
export const loadScrollMsgForPlan = ({ dispatch }) => dispatch('scrollMsgForPlan')

export const loadBannerForPlan = ({ dispatch }) => dispatch('bannerForPlan')

export const loadRangeList = ({dispatch}) => dispatch('rangeList')

export const loadBannerForHP = ({dispatch}) => dispatch('bannerForHP')

export const loadScrollMsgForHP = ({ dispatch }) => dispatch('scrollMsgForHP')

export const loadHpList = ({dispatch}) => dispatch('hpList')

export const loadHpList10 = ({dispatch}) => dispatch('hpList10')

export const loadUserUnreadMsg = ({dispatch}) => dispatch('userUnreadMsg')

export const loadNotice = ({dispatch}) => dispatch('notice')

export const setShowImg = ({dispatch}, n) => dispatch('showImg', n)
