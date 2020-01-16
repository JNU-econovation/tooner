import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import '../../SinglePage.css';
import Board from '../Board';
import PostPage from './PostPage';
import './Notice.css'

function Notice({ match }) {
    var api = "http://168.131.30.129:2599/board/notice";
    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">공지사항</span>
            </div>
            <Route exact path={match.path}>
                <Board json={api} location={match.path} />
            </Route>
            <Route path={`${match.path}/post/:articleid`}>
                <PostPage json={api} location={match.path} />
            </Route>
        </div>
    );
}

export default Notice;