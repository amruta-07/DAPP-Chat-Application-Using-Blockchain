import GUN from 'gun'
import 'gun/sea' //security , encryption , authorization
import'gun/axe'

export const db=GUN();

export const User=db.user().recall({sessionStorage: true});


//username
// user.get('alias').on(v=>)