import Header from './components/Layout/Header/Header';
import './index.css';
import LoadingOverlay from './components/Layout/Loading/LoadingOverlay';

const App = (props) => {
    return (
        <>
            <Header/>
            <div className={"page-content"}>
                {props.children}
            </div>
            <LoadingOverlay/>
        </>
    );
}

export default App;
