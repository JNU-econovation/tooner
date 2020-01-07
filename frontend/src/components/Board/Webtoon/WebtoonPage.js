import React from 'react';
import { Route } from 'react-router-dom';
import '../../SinglePage.css';
import Sort from './Sort';
import Board from '../Board';
import PostPage from '../../PostPage';

function WebtoonPage({ match }) {
    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">웹툰이야기</span>
            </div>
            <Route exact path={match.path}>
                <Sort />
                <Board json="http://168.131.30.129:2599/getBoard/webtoon" />
            </Route>
            <Route path={`${match.path}/:articleid`}>
                <PostPage json="http://168.131.30.129:2599/getBoard/webtoon" />
            </Route>
        </div>
    );
}

export default WebtoonPage;