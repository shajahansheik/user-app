import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import '../assets/css/carousel.scss';
import { FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function BlogPost() {
    const location = useLocation();
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.getItem("langPref") === 'french' ? "french" : localStorage.getItem("langPref"));

    let usetType = localStorage.getItem('visitorType')
    const [type, setType] = useState(usetType)
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setType(localStorage.getItem('visitorType'))
        });

    }, [])
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setLang(localStorage.getItem('langPref'))
        });
        if (localStorage.getItem("email") === '' || localStorage.getItem("email") === null || localStorage.getItem("email") === undefined) {
            localStorage.setItem("redirect", location.pathname);
            navigate('/');
        }
    }, [])
    const { id } = useParams();

    let service = location?.state !== null ? location?.state?.subject : localStorage.getItem("service")
    const [subject, setSubject] = useState(id);
    console.log("location", location, subject)
    return (
        <div>



            {
                subject === "AI_Development" ? <div>
                    <div className='blogMain text-black' >
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                            <h2 className='servicesHeading'>AI development challenges in OOP</h2>
                            <div className='text-left  w-full flex items-center justify-center'>
                                <p><i>Authors: Haritha. J</i></p>
                                &nbsp;&nbsp;&nbsp;<p><i>Date: 31 May 2023.</i></p>
                            </div>
                            <img src='https://bondaf.com/media/images/pictures/Articles/AI.gif' className='blogImage' />
                        </div>
                        <br />
                        <div className='articleContent'>
                            <p className='firstPara'>
                                Artificial intelligence (AI) has come a long way in recent years, and as we continue to explore its vast
                                potential, one thing is becoming increasingly clear: AI development brings with it a unique set of
                                challenges. In the world of object-oriented programming (OOP), these challenges can be particularly
                                complex. From navigating the intricacies of machine learning algorithms to grappling with issues
                                surrounding data privacy and security, there's no shortage of obstacles for developers looking to leverage
                                AI in their OOP projects. In this article, we'll take a closer look at some of the most significant challenges
                                facing AI development in OOP today and explore some strategies for overcoming them. So buckle up –
                                we're about to dive deep into the exciting world of AI development!
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Introduction to Artificial Intelligence (AI)</h5>
                            <p>
                                The process of artificial intelligence (AI) involves creating computer systems that are capable of
                                understanding natural language and recognizing objects, which require human intelligence. The goal of AI
                                research is to create computers that behave intelligently.
                            </p>
                            <p>
                                In order to create an AI system, developers need to understand how humans think and learn. They also
                                need to be able to design algorithms, which are sets of rules that a computer can follow in order to solve
                                a problem. In addition, they need to have access to large amounts of data so that the AI system can learn
                                from it.
                            </p>
                            <p>
                                One challenge facing AI developers is how to design an AI system that can generalize from limited data.
                                That is, they need the AI system to be able to make predictions about new data based on what it has
                                learned from the past. Another challenge is dealing with uncertainty. For example, when a person is trying
                                to identify an object in a picture, they might not be sure if it is a cat or a dog. Humans can deal with this
                                kind of uncertainty by making use of their prior knowledge and experience. However, it is not clear how
                                best to design an AI system that can do this.
                            </p>
                            <p>
                                Another challenge for AI developers is creating systems that are ethically sound. As AI systems become
                                more powerful, there is a risk that they could be used for harmful purposes, such as creating false news
                                stories or biased decision-making processes. Developers need to consider these risks
                            </p>
                            <div className='imgLeft' style={{ textAlign: 'center', marginRight: '0.7vw' }}>
                                <img src='https://bondaf.com/media/images/pictures/Articles/AI Programing languages.svg' className='blogArticleImage' />
                                <p style={{ marginTop: '0.3vh' }}>Fig 1. AI Programing Languages</p>
                            </div>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Benefits of AI Development with OOP</h5>
                            <p>
                                When it comes to developing AI applications, there are several benefits to using an object-oriented
                                approach. First, OOP allows for code reuse, which can save time and effort in the development process.
                                Additionally, OOP can lead to more reliable and robust code, as well as better performance. OOP can
                                make it easier to develop applications that are able to learn and adapt over time.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Challenges of AI Development with OOP</h5>
                            <p>
                                There are several challenges that need to be considered when developing AI applications using OOP. First,
                                the application must be designed in a way that allows for flexibility and extensibility. This is necessary in
                                order to accommodate future changes and additions to the AI system. Additionally, the application must
                                be able to handle data of various types and sizes. This can be a challenge when dealing with large amounts
                                of data. The application must be able to run efficiently on a variety of hardware platforms.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Types of OOP Languages Used in AI Development</h5>
                            <p>
                                When it comes to AI development, there are many different OOP languages to choose from like C++, Java,
                                Python and R. However, not all of these languages are created equal. Some are better suited for specific
                                tasks than others. In this section, we will compare and contrast these different OOP languages for AI
                                development, so that you can decide which one is right for you.
                            </p>
                            <br />
                            <div className='' style={{ textAlign: 'center', marginLeft: '0.7vw' }}>
                                {/* <img src={require('../assets/Image-1.png')} className='blogArticleImage' />
                                <p style={{ marginTop: '0.3vh' }}>Fig 8. Image de L'electronique</p> */}
                                <div className='border border-black text-black'>
                                    {/* <thead> */}
                                    <div className='border-b divide-x divide-black bg-[#3399ff] font-semibold text-black grid grid-cols-5'>
                                        <div>&nbsp;OOP</div>
                                        <div className='col-span-2'>&nbsp;PROS</div>
                                        <div className='col-span-2'>&nbsp;CONS</div>
                                    </div>
                                    {/* </thead> */}
                                    <div className='divide-y divide-black'>
                                        <div className='divide-x divide-black grid grid-cols-5'>
                                            <div className='text-center'>&nbsp;Python</div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp; &minus;
                                                    Easy to learn and use</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Concise and expressive syntax</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Rich set of libraries and frameworks that support AI</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Powerfull data analysis too</p>
                                            </div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Slower than C++ and Java</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Requires more memory than C++</p>
                                            </div>
                                        </div>
                                        <div className='divide-x divide-black grid grid-cols-5'>
                                            <div>&nbsp;Java</div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Fast and efficient</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Portable and Platform independent</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Rich set of libraries and frameworks that support AI</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Large community of active users for support</p>
                                            </div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Verbose syntax, tedious to write
                                                    code
                                                </p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Consumes more memory</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Lacks some useful features for AI
                                                    development (multiple inheritance,
                                                    dynamic typing, etc.)</p>
                                            </div>
                                        </div>
                                        <div className='divide-x divide-black grid grid-cols-5'>
                                            <div>&nbsp;C++</div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Fast and efficient</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Rich set of libraries and frameworks
                                                    that support AI</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Perfect for number crunching</p>
                                            </div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Steep learning curve</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Complex and verbose syntax</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Weak type system</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Lacks some useful features for AI
                                                    development (garbage collection,
                                                    dynamic typing, etc.)</p>
                                            </div>
                                        </div>
                                        <div className='divide-x divide-black grid grid-cols-5'>
                                            <div>&nbsp;R</div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    provides great performance for large
                                                    numbers</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Perform complex statistical
                                                    calculations</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Rich set of libraries and frameworks
                                                    that support AI</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Provides strong and interactive
                                                    graphics capability to users</p>
                                            </div>
                                            <div className='col-span-2 text-left'>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Basic security</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Slower than Python</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Requires more memory</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Low support</p>
                                                <p>&nbsp;&nbsp;&minus;
                                                    Does not have support for dynamic
                                                    or 3D graphics</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Strategies for Overcoming the Challenges of AI Development with OOP</h5>
                            <p>
                                There are many challenges that come with developing AI using object-oriented programming (OOP).
                                However, there are also many strategies that can be used to overcome these challenges.
                            </p>
                            <p>
                                One challenge is that AI development using OOP can be very time consuming. This is because developers
                                need to create and test a lot of different objects in order to get the AI to work properly. There are several
                                strategies that can be used to speed up the development process. For example, developers can use object
                                pools and pre-fabricated objects. Another strategy is to use design patterns. Design patterns can help
                                developers create objects more quickly and efficiently.
                            </p>
                            <p>
                                Another challenge is that it can be difficult to debug AI programs written in OOP. It could be hard to track
                                down the source of errors in complex object hierarchies.By using techniques such as object pools, design
                                patterns, logging, and unit testing, developers can speed up the development process and reduce the
                                amount of time spent debugging their code.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Conclusion</h5>
                            <br/>
                            <p className='firstPara'>
                            Artificial intelligence  development in OOP is a complex process that requires special attention and care. From
                                properly planning the architecture of your system to ensuring safety protocols are implemented, there
                                are many aspects to consider. We hope that our tips have given you some insight into how you can better
                                design and develop your own AI projects using OOP principles. With careful consideration and the right
                                tools at hand, you too can create amazing applications with great potential for success.
                            </p>
                        </div>

                        {/* <div className='blogshareIconMain'>
                            <div className='paragraph1' style={{ color: 'black' }}>Like what you see? Share with a friend.</div>
                            <div className='flex flex-row'>
                                <img src={require('../assets/linkedin-btn.png')} className='shareIcons' />
                                <img src={require('../assets/twitter-btn.png')} className='shareIcons' />

                                <img src={require('../assets/fb-btn.png')} className='shareIcons' />
                                <FaEnvelope className='shareIcons' />
                            </div>
                        </div> */}
                    </div>
                </div> : null
            }
            {
                subject === 'Factors_to_consider' ? <div>
                    <div className='blogMain text-black' >
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <h2 className='servicesHeading'>Factors to consider when determining the
                                best programming language for a software
                                project </h2>
                            <div className='text-left  w-full flex items-center justify-center'>
                                <p><i>Authors: Haritha. J</i></p>
                                &nbsp;&nbsp;&nbsp;<p><i>Date: 24 June 2023.</i></p>
                            </div>
                            <img src='https://bondaf.com/media/images/pictures/Articles/Factors to consider.svg' className='blogImage' />
                        </div>
                        <br />
                        <div className='articleContent'>
                            <p className='firstPara'>
                                Programming languages are the building blocks of any software project. Each one has its own
                                unique strengths, and weaknesses. With so many options to choose from, determining the best
                                programming language for a software project can be quite daunting. How do you know which
                                one will be the most effective for your needs? In this article, we'll explore some key factors to
                                consider that will help you make an informed decision about which programming language is
                                right for your next project.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>1. Type of Software Project</h5>
                            <p>
                                The type of software project has a significant impact on the choice of programming language. For
                                example, web development projects typically require programming languages such as HTML,
                                CSS, and JavaScript, while mobile app development may require languages like Java or Swift. The
                                choice of programming language depends on the specific requirements of the project, including
                                the features and functionalities it needs, the target platform, and the size and complexity of the
                                project. For instance, Python is widely used for machine learning applications, while C++ is
                                commonly used for gaming and virtual reality development. Ultimately, selecting the right
                                programming language depends on the unique needs of each project, and choosing the wrong
                                language can have severe implications for its success.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>2. Performance Requirements</h5>
                            <p>
                                Performance requirements are a crucial consideration that should be factored into the decisionmaking process. Applications with high-performance requirements, such as games or complex
                                simulations, require languages that can handle intensive computations and large amounts of
                                data. Languages such as C++ and Rust are known for their high-performance capabilities and are
                                often used in the development of such applications. On the other hand, for web applications or
                                software with less demanding requirements, languages like Python or Ruby can be more suitable
                                due to their ease of use and rapid development capabilities. However, it is important to
                                remember that performance isn't just about speed, but also about efficiency, scalability, and
                                resource utilization. Ultimately, the choice of programming language will depend on a careful
                                assessment of the performance needs of the application and how they align with the strengths
                                and weaknesses of different languages.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>3. Availability of Developers</h5>
                            <p>
                                The availability of developers who are proficient in a particular programming language is also an
                                essential factor to consider. It's important to ensure that there is a pool of experienced
                                developers available who can work with the chosen programming language to build, test and
                                maintain the software project efficiently. Choosing a language with limited support or a relatively
                                small community of developers can have implications for project timelines and budget, as it may
                                take longer to find developers capable of working with such language. Additionally, developers
                                familiar with less popular languages can be more expensive to hire, which can impact the project
                                budget, specially if ressouce is limited. Therefore, it's wise to consider opting for popular, widelyused programming languages like C, C++, Java, JavaScript, Python or C#, as they have larger
                                developer communities and wider support. This can help reducing delays and minimizing
                                expenses in the long run.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>4. Support and Resources</h5>
                            <p>
                                A programming language with adequate support and resources available is crucial to the success
                                of any software project. It's important to ensure that there are readily available resources, such
                                as online tutorials, documentation, and community support for the chosen language. These
                                resources can help developers quickly identify and overcome any challenges they face during
                                development, reducing downtime and minimizing delays. For example, the Python programming
                                language has an extensive library of documentation, tutorials, and active online forums, making
                                it easy for developers to find support when needed. Similarly, JavaScript has a wealth of
                                frameworks, libraries, and community-driven repositories on platforms like GitHub that can be
                                leveraged to expedite development. The availability of these resources helps reduce the risk of
                                getting stuck and increases the development pace of the project. In summary, opting for
                                programming languages with substantial support infrastructure will mitigate the risks associated
                                with potential pitfalls and enhance the software project's overall efficiency and success rate.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>5. Security Considerations</h5>
                            <p>
                                The choice of programming language can have a direct impact on the security of a software
                                project. Certain languages, such as Java and C++, offer built-in safeguards against common
                                security threats due to their powerful memory management capabilities. Conversely, some
                                languages are more prone to security vulnerabilities, such as PHP and Perl. When selecting a
                                language with security in mind, several factors need to be considered. One important factor is
                                the availability of libraries or frameworks that offer security features like encryption, antitampering mechanisms, and user input validation. Additionally, the language's ease of use in
                                implementing security protocols is an important consideration. For example, Ruby on Rails has
                                an extensive library of security-oriented gems that enable developers to secure their applications
                                quickly.
                            </p>
                            <p>
                                Finally, it's essential to consider the language's community support concerning security.
                                Languages with active security communities, like Python, have a wealth of penetration testing
                                tools available that can detect potential vulnerabilities and strengthen the overall security of the
                                application. Hence, opting for a programming language with security features built-in, along with
                                proven track records of community support and libraries, will go a long way in strengthening your
                                software project's overall security posture.
                            </p>
                            <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>6. Scalability and Flexibility</h5>
                            <p>
                                The scalability and flexibility of a programming language must be taken into consideration when
                                selecting a language. Scalability refers to the ability of a language to handle an increasing volume
                                of data, traffic, and users as the software project grows. On the other hand, flexibility refers to
                                the ease with which developers can modify or extend the codebase in response to changing
                                requirements or new functionality needs. Languages known for their scalability and flexibility
                                include Java, Python, and JavaScript. Java's object-oriented design allows for easy modularization
                                and scalability, while Python's concise syntax and dynamic typing make it an excellent choice for
                                rapid prototyping and iteration on new concepts. Additionally, JavaScript's broad compatibility
                                and popularity make it a versatile language for both front and back-end development, with many
                                frameworks and libraries available. A language with strong scalability and flexibility
                                characteristics is crucial for ensuring a long-term success rate of your software project, especially
                                with modern software needs that require continuous improvement and adaptation.
                            </p>
                            <br/>
                            <p className='firstPara'>
                                In conclusion there is no one-size-fits-all answer to the question of which programming language
                                is best for a software project. Depending on project's unique needs and requirements, a specific
                                language may be more suitable than others. Therefore, it's important to evaluate each of these
                                factors carefully, compare the pros and cons, and choose the one best suited for the specific
                                project. Remember that is not only choosing the programming language, but also its ecosystem,
                                its community, and its tools. The right decision ultimately comes down to finding the best fit for
                                the project, and goals.
                            </p>
                            <br/>
                            <p className='firstPara'>
                                Our team of experienced engineers and developers can work closely with customers to identify
                                their specific software needs and requirements, before developing customized software
                                solutions to meet those needs. BOND'AF offers a wide range of services, including customised
                                software. With our commitment to delivering innovative solutions that focus on customer
                                satisfaction.
                            </p>
                        </div>
                    </div>
                </div> : null
            }
            {
                subject === 'Embedded_AI' ? <div>
                    <div className='blogMain text-black' >
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <h2 className='servicesHeading'>What is Embedded AI?</h2>
                            <div className='text-left  w-full flex items-center justify-center'>
                                <p><i>Authors: Pamela. T</i></p>
                                &nbsp;&nbsp;&nbsp;<p><i>Date: 23 June 2023</i></p>
                            </div>
                            <img src='https://bondaf.com/media/images/pictures/Articles/Embedded AI.svg' className='blogImage' />
                        </div>
                        <br />
                        <div className='articleContent'>
                            <p className='firstPara'>
                                We are living in an era where machine learning will eventually replace human learning. The research
                                of robots and artificial intelligence has been introduced to make humans lives better, but to what extent
                                can this be carried out?
                            </p>
                            <p>
                                Let us look at the difference between Artificial Intelligence (AI) and Embedded Artificial Intelligence.
                                Embedded AI refers to the creation of smart artificial capabilities which are installed in our everyday
                                objects. This means that creations are made and installed in our everyday objects to make our lives better
                                or for a better output. This allows different devices to make decisions or process data and information
                                without relying on us humans or remote servers to process the action. The term ‘AI’ is a field that was
                                initially created to replace Human Intelligence and to perform tasks that always require our known human
                                cognition. These artificial ‘smart’ actions are played out in our everyday problem-solving skills, language
                                processing and decision-making. The thought of a robot deciding for you is out of this world. Would you
                                your gut even allow it?
                            </p>
                            <br />
                            <p >
                                When we think about AI or Embedded AI, it seems as if it is something new, something we have never
                                heard of, but the true reality is that it was introduced to us long before the researchers put a name to it.
                                Think about a cellular device for example, has it not evolved over the years? From a phone that had no
                                color screen to a phone that has face recognition and fingerprint security access. The systems installed
                                into our devices are what we call Embedded AI. The only difference between the evolving technology that
                                we know, and AI is that the AI robots must consider the surrounds and perform according to the
                                circumstances around it. Allow me to simplify it for you, here is an example: You have a robot at home.
                                The function of this robot is to fetch your laundry from the washing line every Sunday afternoon at 09
                                exactly 2 PM. This robot is designed and programmed to walk out of the kitchen door, through the paving
                                and to the washing line, it takes the laundry, walks back into the house, and folds it. These are the known functions of the robot, fetching the laundry and folding it. This robot is only made for the functionalities
                                mentioned and it is the owner's responsibility to make sure that the surroundings of the robot are ‘robot
                                friendly.’ This means that the robot's path must always be well structured.
                            </p>
                            <p>
                                Now that we are aware of the robots' functions, what happens when it suddenly starts hailing one Sunday
                                afternoon at exactly 2pm when the robot is meant to step outside and get the laundry? Worst case
                                scenario, you are not even home to stop the robot from stepping outside and getting wet?
                            </p>
                            <p>
                                The hailstorm is so bad that it even knocks the laundry rail down to the ground. A normal robot would still
                                follow its regular programming, get the laundry, and malfunction or shutdown in seconds because:
                            </p>

                            <ul className='list-outside list-disc'>
                                <li className=' ' style={{ textAlign: 'left' }}>It is not programmed to walk in wet conditions,</li>
                                <li className=' ' style={{ textAlign: 'left' }}>It is not built to resist hard ice hitting on its surface</li>
                            </ul>
                            <p>
                                But an AI robot or Embedded AI bot will function differently. As much as it would not be built to sustain
                                such conditions, it will be able to quickly adjust to the circumstances and surroundings to perform its
                                designated function without the help of a human's input. The bot would probably change the wheels to
                                water proof wheels, have a protective gear to shield it from the hail and it will produce building abilities
                                to pick up the rail from the ground and build it again, perhaps this bot will have an auto detect system
                                that outs the laundry back into the washing machine if it senses that it senses that the laundry is dirty and
                                needs another wash.
                            </p>
                            <br />
                            <p >
                                The AI bot is built to adapt, reason and to provide solutions. The first robot is what we refer to as ‘weak
                                AI.’ Weak AI is both programmed to perform only the designated tasks. The second bot is called ‘strong
                                AI’ where it has more abilities than what is expected of it. robots that will be exactly like humans, robots
                                that have thoughts, emotions, citizenship, and read people's emotions. The future is becoming remarkably
                                interesting. We can conclude that Embedded Al has been around for the longest time. It keeps getting
                                better with time and we believe that if it were not time-consuming and very costly to manufacture then
                                the world would be a completely different place.
                            </p>
                            <br/>
                            <p className='firstPara'>
                                With our team of highly skilled engineers and developers, we collaborate very closely with our customers
                                and clients to determine their unique software and engineering requirements. Subsequently, we also
                                create tailored software solutions to address all the specific needs. BOND’AF provides an extensive range
                                of services, including personalised software solutions. Our dedication strongly lies on delivering customer
                                centric solutions as well inventive solutions to ensure utmost satisfaction. We put our ‘know-how’ to work
                                on their projects.
                            </p>
                        </div>
                    </div>
                </div> : null
            }
            {
                subject === 'Electronic_Potting' ? <div className='blogMain text-black' >
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 className='servicesHeading'>Electronic Potting</h2>
                        <div className='text-left  w-full flex items-center justify-center'>
                            <p><i>Authors: Yolande. V</i></p>
                            &nbsp;&nbsp;&nbsp;<p><i>Date: 12 July 2023</i></p>
                        </div>
                        <img src='https://bondaf.com/media/images/pictures/HW/Fermadur.svg' className='blogImage' />
                    </div>
                    <br />
                    <div className='articleContent'>
                        <p className='firstPara'>
                            The aim of this article is to inform the industry about the complexities of potting printed circuit boards
                            assembly (PCBAs). To do this, we share our potting experience with Polyurethane potting or Fermadur
                            Henkle Sonderhoff's trade name and Sika potting, for example.
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>What is Potting in Electronics</h5>
                        <p>
                            In electronics, potting is a process that consists of filling a complete electronic assembly with a solid or
                            gelatinous compound to make it resistant to shock and vibration, to exclude water, humidity or corrosive
                            agents, and, for high-voltage assemblies, to exclude gaseous phenomena such as corona discharges. In
                            industry, potting is used to seal industrial components.
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>What is Potting compound </h5>
                        <br />
                        {/* <a href='https://www.bondaf.com/media/videos/Services/Potting_Compound-by-MG.mp4' target='_blank'>https://www.bondaf.com/media/videos/Services/Potting_Compound-by-MG.mp4</a> */}
                        <div className='blogImage flex flex-col items-center justify-center '>
                            <video autoPlay muted loop id="video" className="h-full bg-black">
                                <source src='https://bondaf.com/media/videos/Services/Potting_Compound-by-MG.mp4' type="video/mp4" />

                            </video>
                            <br />
                            <p>Fig.1 MG chemicals, Potting Compounds animation</p>
                        </div>
                        <br />
                        <p>
                            The potting compound is a chemical reaction that forms within minutes of mixing two components
                            consisting of a resin base and a hardener in a predetermined ratio.
                        </p>

                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>PCBA Potting</h5>
                        <p>
                            PCBA potting is not as easy as it should be, but the most important thing is that the result obtained after
                            potting ensures that the electronic devices work properly. In most cases, potting a single PCBA works, but
                            this does not mean that all types of potting react in the same way on electronic components. For example,
                            Fermadur has an exothermic reaction that stresses electronic components, while Sika is more fluid and
                            does not stress electronic components. For both types of potting, the process of making the potting is the
                            most important, because if it is not respected, the electronic components will behave badly.
                        </p>
                        <br />
                        <div className='blogImage flex flex-col items-center justify-center '>
                            <video autoPlay muted loop id="video" className="h-full bg-black">
                                <source src='https://bondaf.com/media/videos/Services/Electronic Potting.mp4' type="video/mp4" />

                            </video>
                            <br />
                            <p>Fig.2 Electronic Potting</p>
                        </div>
                        <br />
                        <p>
                            Potting more than one PCBA into a device becomes complex; the process is not the same as potting a
                            single PCBA, and the result after potting is always a disaster during sample testing. It is always necessary
                            to spend more time testing samples until the process is validated with 100% working samples, which then
                            allows production to proceed.
                        </p>
                        <br/>
                        <p className='firstPara'>
                            Some manufacturers claim to have mastered the subject of potting simply because a process works well
                            on one product, and they believe that it will always work on other products. This perception is wrong
                            because every product concept has its own process. One of the key ingredients of a successful potting
                            process is knowledge of the operational specifications of each electronic component in the PCBA, because
                            the selection of a potting must always meet the needs of the product.
                        </p>
                    </div>
                </div> : null
            }
            {
                subject === 'STM32_the_best_microcontroller_for_industry' ? <div className='blogMain text-black' >
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 className='servicesHeading'>STM32 the best microcontroller for industry</h2>
                        <div className='text-left  w-full flex items-center justify-center'>
                            <p><i>Authors: Yolande. V</i></p>
                            &nbsp;&nbsp;&nbsp;<p><i>Date: 17 July 2023</i></p>
                        </div>
                        <img src='https://bondaf.com/media/images/pictures/Articles/STM32-best-for-industry.svg' className='blogImage' />
                    </div>
                    <br />
                    <div className='articleContent'>
                        <p className='firstPara'>
                            The STM32 microcontroller is indeed one of the best and most widely used microcontroller series in the
                            industry. Although it is difficult to say that one microcontroller is the best for all applications, the STM32
                            series offers a wide range of features, performance levels and development tools that make it a
                            compelling choice for many projects.
                        </p>
                        <p>
                            Here are just some of the reasons why STM32 microcontrollers are best for industry:
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Powerful and scalable </h5>
                        <p>
                            The STM32 series encompasses a wide range of microcontrollers that vary in processing power, memory
                            size and peripherals. From low-cost, low-power microcontrollers to high-performance devices with
                            advanced features, you can find an STM32 chip to suit almost any application.
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Rich peripherals  </h5>

                        <p>
                            STM32 microcontrollers offer a wide range of integrated peripherals, including GPIO, UART, SPI, I2C, USB,
                            Ethernet, ADC, DAC, timers and more. This wide range of peripherals facilitates interfacing with external
                            components and enables microcontrollers to handle a variety of tasks efficiently.
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Hardware and software ecosystem </h5>
                        <p>
                            STMicroelectronics provides a complete ecosystem to support the development of the STM32. This
                            includes development boards, evaluation kits, integrated development environments (IDEs) such as
                            STM32CubeIDE, libraries, middleware and comprehensive documentation. The presence of a mature
                            ecosystem simplifies the development process and accelerates time-to-market.
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>ARM Cortex-M architecture </h5>
                        <p>
                            STM32 microcontrollers are based on ARM Cortex-M processor cores, such as Cortex-M0, Cortex-M3,
                            Cortex-M4 and Cortex-M7. These cores offer excellent performance, high energy efficiency and a wide
                            range of features that enable efficient code execution and real-time processing.
                        </p>
                        <h5 className='blogParaGeneralHeading ' style={{ textAlign: 'left' }}>Range of tools and support  </h5>
                        <p>
                            The STM32 community is dynamic and active, with a large number of developers using STM32
                            microcontrollers. This means that you can find many online resources, forums, tutorials and example
                            projects to help you in your development process. In addition, STMicroelectronics provides technical
                            support and regular firmware updates to enhance the capabilities of its microcontrollers.
                        </p>
                        <br/>
                        <p className='firstPara'>
                            Although STM32 microcontrollers offer many advantages, the choice of the "best" microcontroller
                            ultimately depends on the specific requirements of your project, such as power constraints, performance
                            needs, available peripherals and development resources. We always recommend carefully assessing your
                            project requirements and comparing the different microcontroller options to make an informed decision.
                        </p>

                    </div>
                </div> : null
            }

            {type === 'professional' ? <div style={{ marginBottom: '1.6vw', marginTop: '1vw' }} className='blogMain'>
                <h4 className='articlesHeader'>{lang === 'french' ? "Vous pourriez être intéressé par" : "You Might Be Interested In"}</h4>
                <div className='articleCards lg:w-[57vw] lg:overflow-x-scroll' style={{}}>
                    <div className='lg:w-[18vw]' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                        <img src='https://bondaf.com/media/images/pictures/Articles/AI.png' alt="Card image cap" className='articleImage' />
                        <div style={{ padding: '0.4vw 0.6vw' }}>
                            <p className='postCardPara'><i>Date: 31 May 2023.</i></p>
                            <h5 className='postCardHeader' style={{ color: 'black' }} >AI development challenges in OOP</h5>
                            <p className='paragraph1 aboutParaService1'>Artificial intelligence (AI) has come a long way in recent years, and as we continue to explore its vast
                                potential, one thing is becoming increasingly clear: AI development brings with it a unique set of
                                challenges. In the world of object-oriented programming (OOP), these challenges can be particularly
                                complex. From navigating the intricacies of machine learning algorithms to grappling with issues
                                surrounding data privacy and security, there's no shortage of obstacles for developers looking to leverage
                                AI in their OOP projects. In this article, we'll take a closer look at some of the most significant challenges
                                facing AI development in OOP today and explore some strategies for overcoming them. So buckle up &minus;
                                we're about to dive deep into the exciting world of AI development!</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                {/* <span className='postCardPara' >12 Min Read</span> */}
                                {/* <Link to="/blog"><a href="#" className='postCardLink' state={{ article: 'AI_Development' }}>Read More {'->'}</a></Link> */}
                                {/* <Link to="/blog/AI_Development" className='postCardLink' state={{ article: 'AI_Development' }}> Read More {'->'}</Link> */}
                                <button className='postCardLink underline' onClick={() => { navigate('/blog/AI_Development'); window.location.reload(); }}>Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[18vw]' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                        <img src='https://bondaf.com/media/images/pictures/Articles/Embedded AI.png' alt="Card image cap" className='articleImage' />
                        <div style={{ padding: '0.4vw 0.6vw' }} >
                            <div>
                                <p className='postCardPara'><i>Date: 23 June 2023</i></p>
                                <h5 className='postCardHeader' style={{ color: 'black' }}>What is Embedded AI?</h5>
                                <p className='paragraph1 aboutParaService1'>We are living in an era where machine learning will eventually replace human learning. The research
                                    of robots and artificial intelligence has been introduced to make humans lives better, but to what extent
                                    can this be carried out?</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }} >
                                {/* <span className='postCardPara' >12 Min Read</span> */}
                                {/* <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link> */}
                                {/* <Link to="/blog/Embedded_AI" className='postCardLink' state={{ article: 'Embedded_AI' }}> Read More {'->'}</Link> */}
                                <button className='postCardLink underline' onClick={() => { navigate('/blog/Embedded_AI'); window.location.reload(); }}>Read More</button>

                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[18vw]' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                        <img src='https://bondaf.com/media/images/pictures/Articles/Factors to consider.png' alt="Card image cap" className='articleImage' />
                        <div style={{ padding: '0.4vw 0.6vw' }}>
                            <p className='postCardPara'><i>Date: 24 June 2023.</i></p>
                            <h5 className='postCardHeader' style={{ color: 'black' }}>Factors to consider when determining the
                                best programming language for a software
                                project</h5>
                            <p className='paragraph1 aboutParaService1'>Programming languages are the building blocks of any software project. Each one has its own
                                unique strengths, and weaknesses. With so many options to choose from, determining the best
                                programming language for a software project can be quite daunting. How do you know which
                                one will be the most effective for your needs? In this article, we'll explore some key factors to
                                consider that will help you make an informed decision about which programming language is
                                right for your next project</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                {/* <span className='postCardPara' >12 Min Read</span> */}
                                {/* <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link> */}
                                {/* <Link to="/blog/Factors_to_consider" className='postCardLink' state={{ article: 'Factors_to_consider' }}> Read More {'->'}</Link> */}
                                <button className='postCardLink underline' onClick={() => { navigate('/blog/Factors_to_consider'); window.location.reload(); }}>Read More</button>

                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[18vw]' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                        <img src='https://bondaf.com/media/images/pictures/HW/Fermadur.png' alt="Card image cap" className='articleImage' />
                        <div style={{ padding: '0.4vw 0.6vw' }}>
                            <p className='postCardPara'><i>Date: 12 July 2023.</i></p>
                            <h5 className='postCardHeader' style={{ color: 'black' }}>Electronic Potting </h5>
                            <p className='paragraph1 aboutParaService1'>The aim of this article is to inform the industry about the complexities of potting printed circuit boards
                                assembly (PCBAs). To do this, we share our potting experience with Polyurethane potting or Fermadur
                                Henkle Sonderhoff's trade name and Sika potting, for example.</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                {/* <span className='postCardPara' >12 Min Read</span> */}
                                {/* <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link> */}
                                {/* <Link to="/blog/Electronic_Potting" className='postCardLink' state={{ article: 'Electronic_Potting' }}> Read More {'->'}</Link> */}
                                <button className='postCardLink underline' onClick={() => { navigate('/blog/Electronic_Potting'); window.location.reload(); }}>Read More</button>

                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[18vw]' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                        <img src='https://bondaf.com/media/images/pictures/Articles/STM32-best-for-industry.png' alt="Card image cap" className='articleImage' />
                        <div style={{ padding: '0.4vw 0.6vw' }}>
                            <p className='postCardPara'><i>Date: 17 July 2023.</i></p>
                            <h5 className='postCardHeader' style={{ color: 'black' }}>STM32 the best microcontroller for industry </h5>
                            <p className='paragraph1 aboutParaService1'>The STM32 microcontroller is indeed one of the best and most widely used microcontroller series in the
                                industry. Although it is difficult to say that one microcontroller is the best for all applications, the STM32
                                series offers a wide range of features, performance levels and development tools that make it a
                                compelling choice for many projects. </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                {/* <span className='postCardPara' >12 Min Read</span> */}
                                {/* <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link> */}
                                {/* <Link to="/blog/Electronic_Potting" className='postCardLink' state={{ article: 'Electronic_Potting' }}> Read More {'->'}</Link> */}
                                <button className='postCardLink underline' onClick={() => { navigate('/blog/STM32_the_best_microcontroller_for_industry'); window.location.reload(); }}>Read More</button>

                            </div>
                        </div>
                    </div>

                </div>

            </div> : ''}
            {/* <div className='blogMain' >
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h2 className='servicesHeading'>Mattis nec mattis lacus metus, mattis diam. Est.</h2>
                    <img src={require('../assets/Image-1.png')} className='blogImage' />
                </div>
                <div className='articleContent'>
                    <p className='firstPara'>Aolor duis sed suspendisse est. Sit pellentesque convallis scelerisque enim. Diam purus at magna sceler integer. Sodales augue at arcu orci faucibus cursus ac iaculis. Sed aenean quam quam elementum adipis molestie at lacus, amet. Ultricies sollicitudin in cursus risus at mauris. Nunc, facilisis varius sollicitudin quam tincidunt sed. Cras vulputate nunc scelerisque interdum dolor porttitor proin morbi. Dignissim viverra vitae.</p>
                    <h5 className='blogParaGeneralHeading'>Risus a vel magnis.</h5>
                    <p>Aliquet elementum aliquam ultricies pharetra elementum volutpat, amet mauris. Adipiscing turpis non aliquet bibendum nisi magna feugiat eu. Velit enim velit amet, auctor interdum. Nec, cursus eu, amet non molestie vulputate interdum nunc lectus. Elementum purus tortor eu nulla sit. Cras viverra egestas a at ut. Neque, egestas ipsum ipsum diam, velit ut mauris.</p>
                    <p >Non nibh amet, turpis ornare. Mi mi eget neque donec. Nunc, a nulla non diam tellus purus ipsum et laoreet. Sed pellentesque morbi volutpat tristique non. In tellus eleifend pellentesque volutpat sed bibendum nisi tincidunt. Nibh sit magnis a, urna laoreet nam dolor risus iaculis. Cursus sodales nunc orci ut mattis in eget maecenas. Nec, nec bibendum faucibus nunc eu odio molestie in pulvinar. Et odio vitae fusce mattis condimentum congue iaculis felis. Et egestas facilisi mauris libero, vulputate molestie est. Tristique quam.</p>
                    <div className='imgLeft' style={{ textAlign: 'center', marginRight: '0.7vw' }}>
                        <img src={require('../assets/Image-1.png')} className='blogArticleImage' />
                        <p style={{ marginTop: '0.3vh' }}>Fig 8. Image de L'electronique</p>
                    </div>
                    <h5 className='blogParaGeneralHeading'>Consequat leo mi convallis.</h5>
                    <p >Parturient ut aliquam donec senectus sed. At maecenas enim, donec blandit faucibus purus vitae est suspendisse. Id posuere scelerisque ac urna, pharetra rhoncus nunc sagittis. Donec turpis et aliquam mauris massa. Ac luctus turpis sapien est, tellus scelerisque convallis. Sit orci, eu elementum tincidunt facilisis aenean ornare purus. Semper neque, mollis nisi, euismod non fringilla non dis purus. Tincidunt consectetur quam elit gravida nunc, vitae sed donec. Nec pellentesque in at lacus. Bibendum tincidunt eget neque nisi, in. Maecenas mi morbi dui id hendrerit vel. </p>
                    <p>Aliquet elementum aliquam ultricies pharetra elementum volutpat, amet mauris. Adipiscing turpis non aliquet bibendum nisi magna feugiat eu. Velit enim velit amet, auctor interdum. Nec, cursus eu, amet non molestie vulputate interdum nunc lectus. Elementum purus tortor eu nulla sit. Cras viverra egestas a at ut. Neque, egestas ipsum ipsum diam, velit ut mauris.</p>
                    <div className='imgRight' style={{ textAlign: 'center', marginLeft: '0.7vw' }}>
                        <img src={require('../assets/Image-1.png')} className='blogArticleImage' />
                        <p style={{ marginTop: '0.3vh' }}>Fig 8. Image de L'electronique</p>
                    </div>
                    <h5 className='blogParaGeneralHeading'>Consequat leo mi convallis.</h5>
                    <p >Parturient ut aliquam donec senectus sed. At maecenas enim, donec blandit faucibus purus vitae est suspendisse. Id posuere scelerisque ac urna, pharetra rhoncus nunc sagittis. Donec turpis et aliquam mauris massa. Ac luctus turpis sapien est, tellus scelerisque convallis. Sit orci, eu elementum tincidunt facilisis aenean ornare purus. Semper neque, mollis nisi, euismod non fringilla non dis purus. Tincidunt consectetur quam elit gravida nunc, vitae sed donec. Nec pellentesque in at lacus. Bibendum tincidunt eget neque nisi, in. Maecenas mi morbi dui id hendrerit vel. </p>
                </div>

                <div className='blogshareIconMain'>
                    <div className='paragraph1' style={{ color: 'black' }}>Like what you see? Share with a friend.</div>
                    <div className='flex flex-row'>
                        <img src={require('../assets/linkedin-btn.png')} className='shareIcons' />
                        <img src={require('../assets/twitter-btn.png')} className='shareIcons' />

                        <img src={require('../assets/fb-btn.png')} className='shareIcons' />
                        <FaEnvelope className='shareIcons' />
                    </div>
                </div>
                <div style={{ marginBottom: '1.6vw', marginTop: '1vw' }}>
                    <h4 className='articlesHeader'>You Might Be Interested In</h4>
                    <div className='articleCards ' style={{}}>
                        <div className='shadw articleCard' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                            <img src='https://bondaf.com/media/images/pictures/Image-5.png' alt="Card image cap" className='articleImage' />
                            <div style={{ padding: '0.4vw 0.6vw' }}>
                                <p className='postCardPara'>Category &middot; 1 Month Ago</p>
                                <h5 className='postCardHeader' style={{ color: 'black' }} >Cum metus nunc in odio.</h5>
                                <p className='paragraph1'>lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  eleifend sed  Donec quis magna sed felis elemeblandit nec quis sem.</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className='postCardPara' >12 Min Read</span>
                                    <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className='shadw articleCard' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                            <img src='https://bondaf.com/media/images/pictures/Image-5.png' alt="Card image cap" className='articleImage' />
                            <div style={{ padding: '0.4vw 0.6vw' }}>
                                <p className='postCardPara'>Category &middot; 1 Month Ago</p>
                                <h5 className='postCardHeader' style={{ color: 'black' }}>Cum metus nunc in odio.</h5>
                                <p className='paragraph1'>lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  eleifend sed  Donec quis magna sed felis elemeblandit nec quis sem.</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className='postCardPara' >12 Min Read</span>
                                    <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className='shadw articleCard' style={{ backgroundColor: 'white', borderRadius: '1.1vw', marginBottom: '1.1vw' }}>
                            <img src='https://bondaf.com/media/images/pictures/Image-5.png' alt="Card image cap" className='articleImage' />
                            <div style={{ padding: '0.4vw 0.6vw' }}>
                                <p className='postCardPara'>Category &middot; 1 Month Ago</p>
                                <h5 className='postCardHeader' style={{ color: 'black' }}>Cum metus nunc in odio.</h5>
                                <p className='paragraph1'>lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  eleifend sed  Donec quis magna sed felis elemeblandit nec quis sem.</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className='postCardPara' >12 Min Read</span>
                                    <Link to="/blog"><a href="#" className='postCardLink'>Read More {'->'}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}

        </div>
    )
}
