import { React, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as BellIcon } from "./assets/bell.svg";
import { ReactComponent as ChatIcon } from "./assets/chat-text.svg";
import { ReactComponent as ArrowLeftIcon } from "./assets/chevron-left.svg";
import { ReactComponent as ArrowRightIcon } from "./assets/chevron-right.svg";
import { ReactComponent as DoorIcon } from "./assets/door-open.svg";
import { ReactComponent as EnvelopeIcon } from "./assets/envelope.svg";
import { ReactComponent as FeedbackIcon } from "./assets/exclamation-diamond.svg";
import { ReactComponent as ProblemIcon } from "./assets/exclamation-square.svg";
import { ReactComponent as ConfigIcon } from "./assets/gear.svg";
import { ReactComponent as LanguageIcon } from "./assets/globe.svg";
import { ReactComponent as ActivityIcon } from "./assets/list-task.svg";
import { ReactComponent as CreateIcon } from "./assets/plus-lg.svg";
import { ReactComponent as HelpIcon } from "./assets/question-circle.svg";
import { ReactComponent as PrivacyIcon } from "./assets/shield-lock.svg";
import { ReactComponent as DropDownIcon } from "./assets/caret-down.svg";

function App() {
    return (
        <Navbar>
            <NavItem icon={<CreateIcon />} />
            <NavItem icon={<ChatIcon />} />
            <NavItem icon={<BellIcon />} />
            <NavItem icon={<DropDownIcon />}>
                <DropdownMenu />
            </NavItem>
        </Navbar>
    );
}

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar__list">{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className="navbar__item">
            <a href="#" className="icon-btn" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <a
                href="#"
                className="menu__item"
                onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
            >
                {props.leftIcon && (
                    <span className="icon-btn left">{props.leftIcon}</span>
                )}

                {props.children}

                {props.rightIcon && (
                    <span className="icon-right">{props.rightIcon}</span>
                )}
            </a>
        );
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        leftIcon={<ConfigIcon />}
                        rightIcon={<ArrowRightIcon />}
                        goToMenu="settings"
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        leftIcon={<HelpIcon />}
                        rightIcon={<ArrowRightIcon />}
                        goToMenu="help"
                    >
                        Help & Support
                    </DropdownItem>
                    <DropdownItem leftIcon={<FeedbackIcon />}>
                        Give feedback
                    </DropdownItem>
                    <DropdownItem leftIcon={<DoorIcon />}>
                        Sign Out
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "settings"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem leftIcon={<ArrowLeftIcon />} goToMenu="main">
                        <p className="menu__title">Settings and Privacy</p>
                    </DropdownItem>
                    <DropdownItem leftIcon={<ConfigIcon />}>
                        Settings
                    </DropdownItem>
                    <DropdownItem leftIcon={<LanguageIcon />}>
                        Language
                    </DropdownItem>
                    <DropdownItem leftIcon={<ActivityIcon />}>
                        Activity log
                    </DropdownItem>
                    <DropdownItem leftIcon={<PrivacyIcon />}>
                        Privacy hub
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition 
                in={activeMenu === "help"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem leftIcon={<ArrowLeftIcon />} goToMenu="main">
                        <p className="menu__title">Help & Support</p>
                    </DropdownItem>
                    <DropdownItem leftIcon={<HelpIcon />}>
                        Help Center
                    </DropdownItem>
                    <DropdownItem leftIcon={<EnvelopeIcon />}>
                        Support Inbox
                    </DropdownItem>
                    <DropdownItem leftIcon={<ProblemIcon />}>
                        Report a problem
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}

export default App;
