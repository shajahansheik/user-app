import React from 'react'

import Container from 'react-bootstrap/Container';

import Header from '../components/header';
import Footer from '../components/footer';

import AOS from 'aos';
import 'aos/dist/aos.css';




export default function ServiceComplete() {
    AOS.init()

    return (
        <Container fluid>
            <Header navPosition="right" className="reveal-from-bottom" />
            <div className="row" style={{ background: '#1E1E1E' }}>
                <div className='container'>
                    <div className="row justify-content-center serviceBanner" >
                        <h2 className="serviceCompleteHeading" data-aos="fade-up">Electronics Design Services</h2>
                        <p className="serviceCompletePara" data-aos="fade-up">Evolution of IoT and industry 4.0 is redefining the product hardware design. The success of product development for the connected world depends on the design for:</p>
                        <img src={require('../assets/Image-1.png')} class="serviceCompleteImg" />
                    </div>

                    <div className="row justify-content-center serviceContentList3" >
                        {/* <h4 className='scl3Head'>Our Process</h4> */}
                        <p className='scl3P1' style={{ marginTop: 106 }}>We perform all phases of new product introduction, from design, development, prototyping and transition to manufacturing. Our engineering team can help you finalize your concept, find ways to reduce your product costs, and offer innovative solutions to challenging engineering problems.</p>
                        <p className='scl3P1' style={{ marginTop: 48 }}>WCe pôle couvre les technologies de l’embarqué. Le développement basé sur de cartes électroniques, numériques réalisés à base de composants tels que des microcontrôleurs, DSP ou FPGA. Nos ingénieurs maîtrisent les outils de l’embarqué et les langages de développement embarqué tels que C, C++, Java, Python, VHDL et bien d’autres langages.</p>
                    </div>

                    <div className="row justify-content-center serviceContentList" >
                        <h4 className='scl2Head'>Capacités de dévelopement</h4>
                        <div className='col-md-3'>
                            <img src={require('../assets/v6.png')} class="serviceCompleteImg1" />
                            <h4 >Manufacturability</h4>
                            <div className='hrl'></div>
                            <p className='scp'>Venenatis, ut magna commodo nec. Egestas sed non tortor massa, id condimentum nullam. </p>
                        </div>
                        <div className='col-md-3'>
                            <img src={require('../assets/sync.png')} class="serviceCompleteImg1" />
                            <h4 >Safety</h4>
                            <div className='hrl'></div>
                            <p className='scp'>Scelerisque non a eleifend nisi vestibulum vestibulum arcu. Ultrices ipsum nibh at pharetra ut.</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={require('../assets/box.png')} class="serviceCompleteImg1" />
                            <h4 >Modularity</h4>
                            <div className='hrl'></div>
                            <p className='scp'>Euismod integer velit nullam diam tellus auctor proin in. At molestie tempus et, nisl in. Fames magna.</p>
                        </div>
                    </div>

                    <div className="row justify-content-center serviceContentList1" >
                        <div className='col-md-3'>
                            <img src={require('../assets/sync.png')} class="serviceCompleteImg1" />
                            <h4 >Short Prototyping cycles</h4>
                            <div className='hrl'></div>
                            <p className='scp'>Urna, senectus vivamus gravida quis praesent nulla ultrices. Nec morbi lorem in nulla cras hac non.</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={require('../assets/vec.png')} class="serviceCompleteImg1" />
                            <h4 >Optimized BOM</h4>
                            <div className='hrl'></div>
                            <p className='scp'>A id rhoncus ac viverra in. Commodo arcu purus turpis massa neque donec neque, enim. </p>
                        </div>
                        <div className='col-md-3'>
                            <img src={require('../assets/al.png')} class="serviceCompleteImg1" />
                            <h4 >Regulatory Complaince</h4>
                            <div className='hrl'></div>
                            <p className='scp'>Dis cras tellus nisl quam convallis amet sapien justo tristique. Habitant ornare pretium arcu.</p>
                        </div>
                    </div>


                    <div className="row justify-content-center serviceContentList2" >
                        <h4 className='scl2Head'>Hardware Design Capabilities</h4>
                        <div className='row justify-content-center serviceContentList2Mini'>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-3' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Multi-plane Printed Circuit Board (PCB) design</p></div>
                            </div>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-9' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Hardware performance testing and verification</p></div>
                            </div>
                        </div>
                        <div className='row justify-content-center serviceContentList2Mini'>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-3' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Analog, Digital circuits design</p></div>
                            </div>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-9' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Imaging system development</p></div>
                            </div>
                        </div>
                        <div className='row justify-content-center serviceContentList2Mini'>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-3' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Power system design, Low-power</p></div>
                            </div>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-9' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Digital Signal Processor (DSP)</p></div>
                            </div>
                        </div>

                        <div className='row justify-content-center serviceContentList2Mini'>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-3' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Battery Management Systems</p></div>
                            </div>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-9' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Microprocessor Development</p></div>
                            </div>
                        </div>

                        <div className='row justify-content-center serviceContentList2Mini'>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-3' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Low-noise, High-res Data acquisition</p></div>
                            </div>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-9' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>FPGA Development, including VHDL</p></div>
                            </div>
                        </div>

                        <div className='row justify-content-center serviceContentList2Mini'>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-3' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Wireless and Optical communications</p></div>
                            </div>
                            <div className='col-md-4' style={{ display: 'inline' }}>
                                <div className='col-sm-1' style={{ display: 'inline', float: 'left' }}>
                                    <img src={require('../assets/elec.png')} class="serviceCompleteImg2" />
                                </div>
                                <div className='col-sm-9' data-aos="fade-right" style={{ display: 'inline' }}><p className='scp2'>Signal integrity Analysis</p></div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row justify-content-center serviceContentList3" >
                        <h4 className='scl3Head'>Our Process</h4>
                        <p className='scl3P'>We perform all phases of new product introduction, from design, development, prototyping and transition to manufacturing. Our engineering team can help you finalize your concept, find ways to reduce your product costs, and offer innovative solutions to challenging engineering problems.</p>
                        <div className="row justify-content-center serviceContentList4" style={{marginTop: 48}} >
                            <div className='col-md-3 scl4Block cell00'>
                                <img src={require('../assets/v1.png')} class="serviceCompleteImg4" />
                                <div className='scl4Step'>Step 1</div>
                                <h5 >Concept</h5>
                            </div>
                            <div className='col-md-3 scl4Block cell00'>
                                <img src={require('../assets/v2.png')} class="serviceCompleteImg4" />
                                <div className='scl4Step'>Step 2</div>
                                <h5 >Electronics Architecture</h5>
                            </div>
                            <div className='col-md-3 scl4Block cell01'>
                                <img src={require('../assets/v3.png')} class="serviceCompleteImg4" />
                                <div className='scl4Step'>Step 3</div>
                                <h5 >Design</h5>
                            </div>
                        </div>
                        <div className="row justify-content-center serviceContentList4" >
                            <div className='col-md-3 scl4Block cell02'>
                                <img src={require('../assets/v4.png')} class="serviceCompleteImg4" />
                                <div className='scl4Step'>Step 4</div>
                                <h5 >Validation & Testing</h5>
                            </div>
                            <div className='col-md-3 scl4Block cell02'>
                                <img src={require('../assets/v5.png')} class="serviceCompleteImg4" />
                                <div className='scl4Step'>Step 5</div>
                                <h5 >Prototype Samples</h5>
                            </div>
                            <div className='col-md-3 scl4Block cell03'>
                                <img src={require('../assets/v6.png')} class="serviceCompleteImg4" />
                                <div className='scl4Step'>Step 6</div>
                                <h5 >Manufacturing Processes</h5>
                            </div>
                        </div>
                    </div> */}

                    <div className="row justify-content-center serviceContentList5" style={{ marginTop: 54 }} >
                        <h4 className='scl3Head'>Recent Posts</h4>
                        <div className="row justify-content-center serviceContentList4" style={{ marginTop: 32 }}  >
                            <div className='col-md-4'>
                                <div class="card recentPostCard" style={{ width: "18rem" }}>
                                    <img class="card-img-top" src={require('../assets/Image-5.png')} alt="Card image cap" />
                                    <div class="card-body">
                                        <p class="card-text recentPostCardCategory">Category &middot; 1 Month Ago</p>
                                        <h5 class="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                        <p class="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  eleifend sed  Donec quis magna sed felis elemeblandit nec quis sem.</p>
                                        <span class="recentPostCardTag">12 Min Read</span> <a href="/blog" class="recentPostCardMore">Read More -></a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div class="card recentPostCard" style={{ width: "18rem" }}>
                                    <img class="card-img-top" src={require('../assets/Image-4.png')} alt="Card image cap" />
                                    <div class="card-body">
                                        <p class="card-text recentPostCardCategory">Category &middot; 1 Month Ago</p>
                                        <h5 class="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                        <p class="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  eleifend sed  Donec quis magna sed felis elemeblandit nec quis sem.</p>
                                        <span class="recentPostCardTag">12 Min Read</span> <a href="/blog" class="recentPostCardMore">Read More -></a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div class="card recentPostCard" style={{ width: "18rem" }}>
                                    <img class="card-img-top" src={require('../assets/Image-3.png')} alt="Card image cap" />
                                    <div class="card-body">
                                        <p class="card-text recentPostCardCategory">Category &middot; 1 Month Ago</p>
                                        <h5 class="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                        <p class="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  eleifend sed  Donec quis magna sed felis elemeblandit nec quis sem.</p>
                                        <span class="recentPostCardTag">12 Min Read</span> <a href="/blog" class="recentPostCardMore">Read More -></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}
