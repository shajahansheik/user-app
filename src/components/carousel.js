import React from 'react'

import '../assets/css/carousel.scss';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import Container from 'react-bootstrap/Container';

// fix these later
import img1 from '../assets/Image-1.png'
import img2 from '../assets/Image-2.png'
import img3 from '../assets/Image-3.png'
import img4 from '../assets/Image-4.png'
import img5 from '../assets/Image-5.png'
import img6 from '../assets/Image-6.png'
import img7 from '../assets/Image-7.png'

import content from "../routes/content.json";
import { Link } from 'react-router-dom'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


let imgDict = {
    '-2': img5,
    '-1': img4,
    '0': img7,
    '1': img3,
    '2': img6
}

let testDict = [
    img7,
    img3,
    img4,
    img6,
    img2,
    img7,
    img3,
    img4,
    img7,
    img6,
    img2
]

let imgMap = {
    "Électroniques": img7,
    "Systèmes Embarqués": img3,
    "Mécaniques": img4,

    "R&D Bureau": img6,
    "Développement de Logiciels": img2,

    "Electronic Design": img7,
    "Embedded Systems": img3,
    "Mechanics": img4,
    "Software Development": img2,
    "Technical Design": img2
}




class Item extends React.Component {

    constructor(props) {

        super(props);
        let langPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "french";
        this.state = {
            level: this.props.level,
            val: this.props.val,
            lang: langPref
        }
        window.addEventListener('storage', () => {
            console.log("changed store");
            this.setState({
                lang: localStorage.getItem('langPref')
            })
        });
    }



    render() {
        const className = 'item level' + this.props.level;
        let opacity = 0;
        let levId = 0;
        if (this.props.level === 1 || this.props.level === -1) {
            opacity = 0.1;
            levId = 1;
        }
        if (this.props.level === 2 || this.props.level === -2) {
            opacity = 0.20;
            levId = 2
        }
        console.log(content.carouselPage.cards[this.state.lang][this.props.k], this.props.k);
        return (
            // <div className={className}>
            //     <img src={testDict[this.props.k]} className="carouselItem" />
            // </div>
            <div className="item-overlay">
                <div className={className}
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 17, 34, ${opacity}) 0%, #001122 100%), url(${imgMap[content.carouselPage.cards[this.state.lang][this.props.k]]})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        borderRadius: 4

                    }}
                >

                    <h2 className={`servicesCardHeading${levId}`}>{content.carouselPage.cards[this.state.lang][this.props.k]}</h2>


                    {(this.props.level === 0 && this.state.val === "professional") && (<Link to={{
                        pathname: "/servicedetail"
                    }} state={{ subject: content.carouselPage.subjects[this.props.k%5] }} className="servicesCardLink" >{content.carouselPage.readMore[this.state.lang]}</Link>)}
                </div>
            </div>
        )
    }
}

export default class Carousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            active: this.props.active,
            val: this.props.val,
            direction: ''
        }
        this.rightClick = this.moveRight.bind(this)
        this.leftClick = this.moveLeft.bind(this);

    }

    componentDidMount() {
        // this.interval = setInterval(() => this.moveLeft(), 5000);

        //  clearInterval(interval);
    }

    omponentWillUnmount() {
        clearInterval(this.interval);
    }

    generateItems(val) {
        var items = []
        var level
        console.log(this.state.active)
        console.log("active state", this.state.active);
        let idx = 0;

        for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
            var index = i
            idx = i;
            if (idx < 0) {
                idx = this.state.items.length + i
            }
            if (idx > this.state.items.length - 1) {
                idx = i - this.state.items.length
            }
            if (i < 0) {
                index = this.state.items.length + i
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length
            }
            level = this.state.active - i
            console.log("level: ", level, this.state.items[index])
            items.push(<Item key={index} id={this.state.items[index]} level={level} k={idx} val={val} />)
        }

        // items.push(<Item key={idx+1} id={this.state.items[index]}/>)
        console.log("generating items", items);
        return items
    }


    moveLeft() {
        var newActive = this.state.active
        newActive--
        this.setState({
            active: newActive < 0 ? this.state.items.length - 1 : newActive,
            direction: 'left'
        })
    }

    moveRight() {
        var newActive = this.state.active
        this.setState({
            active: (newActive + 1) % this.state.items.length,
            direction: 'right'
        })
    }

    render() {
        return (
            <Container fluid className="carouselSection">
                <div className="noselect" style={{ backgroundColor: '#EEEFF2' }}>
                <div className="arrowBtns">
                        <div className="arrowBtn" onClick={this.rightClick}><FaChevronLeft className="arrowBtnIC" fontSize={44} style={{ color: '#fff' }} /></div>
                        <div className="arrowBtn" onClick={this.leftClick} style={{ float: 'right' }}><FaChevronRight className="arrowBtnIC" fontSize={44} style={{ color: '#fff' }} /></div>
                        
                    </div>

                    <TransitionGroup>
                        {this.generateItems(this.state.val)}
                    </TransitionGroup>
                    

                </div>
                {/* <div className="arrowBtns">
                    <div className="arrowBtn arrow-left" onClick={this.rightClick}><FaChevronLeft fontSize={44} style={{ color: '#444' }} /></div>
                    <div className="arrowBtn arrow-right" onClick={this.leftClick}><FaChevronRight fontSize={44} style={{ color: '#444' }} /></div>
               </div> */}
            </Container>
        )
    }
}

