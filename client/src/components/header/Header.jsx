import './header.css';
import './responsive.css';
import { hardImg } from './imgLink';
export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSmall">Melophonica</span>
                <span className="headerTitleLarge"> Blog </span>
            </div>
            <img className="headerImg" src={hardImg} alt="" />
        </div>
    )
}
