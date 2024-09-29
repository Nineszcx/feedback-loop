import React from 'react';
import '../css/Header.css'; // 引入样式文件
import { FaComments } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="header">
            <FaComments className="header-icon" /> {/* 为图标添加类 */}
            <h1>Feedback Loop</h1>
        </header>
    );
};

export default Header;
