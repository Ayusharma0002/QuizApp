import React, { useRef,useState } from 'react';
import html2pdf from 'html2pdf.js';
import ReportPieChart from '../WriteExam/ReportBarGraph';
import samvit from '/samvit.png';
import graph1 from '/graph1.png';
import graph2 from '/graph2.png';
 
const Report = ({ result , userName }) => {
    const contentRef = useRef();
    const [showContent, setShowContent] = useState(true);
    const handleDownloadPdf = () => {
        const element = contentRef.current;
 
        if (!element) {
            console.error("Content not found!");
            return;
        }
 
        console.log("PDF Start downloading...");
        
        console.log(`user information report : ${userName}`);
        // console.log(result);
 
        html2pdf()
            .from(element)
            .set({
                margin: [10, 10, 20, 10],
                filename: 'Report.pdf',
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                },
                jsPDF: { orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'] },
            })
            .toPdf()
            .get('pdf')
            .then(function (pdf) {
                const totalPages = pdf.internal.getNumberOfPages();
 
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setFontSize(12);
                    pdf.setPage(i);
                    pdf.addImage(
                        samvit,
                        'PNG', // Image format (adjust if needed, e.g., 'JPEG')
                        pdf.internal.pageSize.getWidth() - 50, // X position (adjust based on logo width)
                        2,    // Y position (top margin)
                        32,    // Width of the logo
                        20     // Height of the logo
                    );
                    pdf.setFontSize(12);
                    pdf.text(
                        `Page ${i} of ${totalPages} | Leadership Diagnostic Report | Situational Leadership | ${userName}`,
                        pdf.internal.pageSize.getWidth() / 2,
                        pdf.internal.pageSize.getHeight() - 10,
                        { align: 'center' }
                    );
                }
            })
            .save();
    };
 
    return (
        <div>
            {showContent &&(
            <div ref={contentRef} style={{ padding: '10px', fontFamily: 'Arial, sans-serif', lineHeight: '1.3' }}>
                {/*Page 1*/}
                <h1 style={{ textAlign: 'center' }}>Understanding your Leadership Aura: Situational Leadership</h1>
                <h2 style={{ textAlign: 'center' }}>Participant Name: {userName}</h2>
 
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img
                        src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Situational Leadership"
                        style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                        crossOrigin="anonymous"
                    />
                </div>
 
                {/*Page 2*/}
                <div className="page-break"></div>
                <section >
                    <strong>What is the Leadership Diagnostic Instrument created by Samvit? </strong>
                    <p>
                        Leadership Diagnostic Instrument (LDI) analyses the feedback given by different sets of people to help you understand your value differences and their implications on critical Leadership areas and your work at NIXI. It enables you to know how your mentees, colleagues, and business partners perceive your ability to think strategically, achieve results; build relationships; influence people; learn & apply; and nurture people.
                    </p>
                    <p>
                        We have gathered the data through Self-assessment, in which you rated yourself on various parameters. You helped us gain a better perspective about yourself by helping us connect with the nominees that you introduced. We will share the analysis as per themes in short reports over the entire Leadership Lab sessions that will be conducted in the coming weeks.
                    </p>
                    <h3>Situational Leadership </h3>
                    <p>
                        The first theme that we would be sharing your report is on “Situational Leadership”. As the name of the approach implies, the situational approach focuses on leadership in situations. The premise of the assessment is that different situations demand different kinds of leadership. From this perspective, to be an effective leader requires that a person adapt his or her style to the demands of different situations.
                    </p>
 
                    <p>
                        The situational approach stresses that leadership is composed of both a directive and a supportive dimension, and that each must be applied appropriately in each situation. To determine what is needed in a particular situation, a leader must evaluate her or his team members and assess how competent and committed they are to perform a given goal. Based on the assumption that team members’ skills and motivation vary over time, situational leadership suggests that leaders should change the degree to which they are directive or supportive to meet the changing needs of team members.
                    </p>
                    <p>
                        In brief, the essence of the situational approach demands that leaders match their style to the competence and commitment of the team members. Effective leaders are those who can recognize what team members need and then adapt their own style to meet those needs.
                    </p>
                    <p>
                        The assessment comprises two major dimensions: leadership style and development level of team members.
                    </p>
                    <h3>
                        Leadership Styles:
                    </h3>
                    <p>
                        Based on Leadership style consists of the behaviours pattern of a person who attempts to influence others. It includes both directive behaviours and supportive behaviours.
                    </p>
                    <p>
                        <strong>Directive behaviours</strong> help group members accomplish goals by giving directions, establishing goals and methods of evaluation, setting timelines, defining roles, and showing how the goals are to be achieved. Directive behaviours clarify, often with one-way communication, what is to be done, how it is to be done, and who is responsible for doing it.
                    </p>
                    <p>
                        <strong>Supportive behaviours</strong> help group members feel comfortable about themselves, their co-workers, and the situation. Supportive behaviours involve two-way communication and responses that show social and emotional support to others.
                    </p>
                </section>
 
                {/*Page 3*/}
                <div className="page-break"></div>
                <section>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={graph1} alt="Image Not found" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
 
                    </div>
                    <strong>#1: Directing Situational Leadership Style: </strong>
                    <p>
                        This situational leadership style is a high directive–low supportive style, which is also called a directing style. In this approach, the leader focuses communication on goal achievement, and spends a smaller amount of time using supportive behaviours. Using this style, a leader gives instructions about what and how goals are to be achieved by the team members and then supervises them carefully.
                    </p>
                    <p>
                        <strong>When it is beneficial? –</strong>   A directive situational leadership style includes creating a clear plan of action for the team to execute when uncertainty is high. During times of chaos or with a brand-new team, there can be a stabilizing effect to directive leadership.
                    </p>
                </section>
                {/*Page 4*/}
                <div className="page-break"></div>
                <section>
                    <h3><strong>Directing Situational Leadership Style</strong></h3>
                    <p>
                        <strong>When can you use it?</strong> – For one of our clients, the directive approach was called for when she saw her team having trouble with the lack of clarity around their latest project. Her typical style was to allow teams a great deal of flexibility in their work. However, she saw frustration and tension building and thought perhaps she could flex her style. With a short deadline and two new team members still learning their roles, she decided the most effective way to move her team forward was to give them clear and direct scope and task guidelines. When each team member followed her direction, the project came into clear focus and the team was brought closer through their shared success.
                    </p>
 
                    <h3><strong>Coaching Situational Leadership Style</strong></h3>
                    <p>
                        This Situational Leadership is a high directive–high supportive style. In this approach, the leader focuses communication on both achieving goals and meeting team members’ socioemotional needs. The coaching style requires that the leader involve himself or herself with followers by giving encouragement and soliciting follower input. However, coaching is an extension of the Directing Situational Leadership style in that it still requires that the leader make the final decision on what and how of goal accomplishment.
                    </p>
                    <p>
                        <strong>When it is beneficial?</strong> - A Coaching Situational Leadership Style is intended to create buy-in and understanding. It aligns with team members who have limited experience performing the task but exude both confidence and motivation toward the process of leader-driven skill development.
                    </p>
                    <p>
                        <strong>When can you use it?</strong> – Team members lack the ability, perhaps due to lack of experience, but are enthusiastic about the work. The leader explains goals, tasks, methods, and reasons, and remains available to give support.
                    </p>
 
                    <h3><strong>Supportive Situational Leadership Style</strong></h3>
                    <p>
                        The Supporting approach requires that the leader take a high supportive–low directive style. In this approach, the leader does not focus exclusively on goals but uses supportive behaviours that bring out team members’ skills around the goal to be accomplished. The supportive style includes listening, praising, asking for input, and giving feedback. A leader using this style gives team members control of day-to-day decisions but remains available to facilitate problem-solving. A Supportive Situational Leader is quick to give recognition and social support to followers.
                    </p>
                    <p>
                        <strong>When it is beneficial?</strong> - The objective of the Supportive Situational Leadership Style is to create alignment.
                    </p>
                    <p>
                        <strong>When can you use it?</strong> – If the team member is developing in terms of competence, he/she might have demonstrated task proficiency but still have some degree of trepidation about performing it on their own. If the team member is regressing, they are aware they can effectively perform but have lost commitment, motivation (or both) to do so. Either way, the leader needs to discuss the follower’s willingness by asking open-ended questions intended to help the follower recognize the source of the performance challenge and generate a viable solution.
                    </p>
 
                    <h3><strong>Delegating Situational Leadership Style</strong></h3>
                    <p>
                        It is a low supportive–low directive style, or a delegating approach. In this approach, the leader offers less goal input and social support, facilitating team members’ confidence and motivation in reference to the goal. The delegative leader lessens involvement in planning, control of details, and goal clarification. After the group agrees on what it is to do, this style lets team members take responsibility for getting the job done the way they see fit. A leader using a delegating approach gives control to followers and refrains from intervening with unnecessary social support.
                    </p>
                </section>
 
                {/*Page 5*/}
                <div className="page-break"></div>
                <section>
                    <h3><strong>Delegating Situational Leadership Style</strong></h3>
                    <p>
                        <strong>When it is beneficial?</strong> - The goal of Delegating Situational Leadership style is to create a team member who feels fully empowered and competent enough to take the ball and run with it, with minimal supervision.
                    </p>
                    <p>
                        <strong>When can you use it?</strong> - As a leader, you can now delegate tasks to the team member and observe with minimal follow-up, knowing that acceptable or even excellent results will be achieved. There is a low focus on tasks and a low focus on relationships. There is no need to compliment the team member on every task, although continued praise for outstanding performance must be given as appropriate. This is a very team member-driven stage.
                    </p>
 
                    <h3><strong>Development Level of Team Member</strong></h3>
                    <p>
                        Development level is the degree to which team members have the competence and commitment necessary to accomplish a given goal or activity. Stated another way, it indicates whether a person has mastered the skills to achieve a specific goal and whether a person has developed a positive attitude regarding the goal.
                    </p>
                    <div className='flex flex-col justify-center items-center'>
 
                        <img src={graph2} alt="Diagram showing development levels and situational leadership" />
                    </div>
 
                    <p>
                        Team members are at a high development level if they are interested and confident in their work and know how to achieve the goal. Team members are at a developing level if they have little skill for the goal at hand but believe that they have the motivation or confidence to get the job done.
                    </p>
                    <p>
                        According to research by Alan D Boss in 2012, analyzing a sample of employees from a wide variety of jobs, it was found that high commitment initially increased slightly but then levelled off for both organizational newcomers and internal job changers. For both groups, competence and commitment increased once they were settled into the new work assignment. As they gained expertise in their work, the team members’ competence increased, which helped in increasing their commitment. The research points out explicitly that the team lead needs to keep in mind these transitions and their occurrence so that relevant interventions and appropriate leadership styles can be adopted to fasten the development level of team members.
                    </p>
                    <p>
                        Effective leadership means transitioning your styles based on what your team member really needs. For example, if a team member is part of a project which they have never done before in their career, they may have low competence but high commitment as they would be excited with the new challenge. This stage of development level of the team member is called "Neo," and the apt situational leadership style
                    </p>
                </section>
 
                {/*Page 6*/}
                <div className="page-break"></div>
                <section>
                    <p>
                        which can be used by the team lead is <strong>Directing</strong> as the team member is not yet competent (skill-wise) to work on their own. The team member’s enthusiasm can be well directed, which would help them in this new transition.
                    </p>
                    <p>
                        Once the team member has transitioned from the initial euphoria of a new challenge, the reality of the challenge sinks in, leading to self-doubt due to low competence. This stage of development level of the team member is called <strong>Intermediate</strong>. As time passes and the team member gains some level of competence, the appropriate leadership style is the <strong>Coaching Leadership style</strong>. Here, the leader senses the need to shift from being directive to becoming a coach.
                    </p>
                    <p>
                        As more time passes and the team member gains more competence, the <strong>Coaching style</strong> of the leader helps the team member overcome their self-doubt. This stage of development of the team member is called <strong>Expert</strong>. At this transition, an effective leader shifts the gears again and displays the <strong>Supportive Leadership Style</strong>.
                    </p>
                    <p>
                        When the team member reaches the <strong>Pro</strong> stage of development, both their competence and commitment levels are high. At this point, the leader recognizes that the team member is now independent enough to perform tasks on their own, and the leader shifts their leadership style to <strong>Delegating</strong>.
                    </p>
                </section>
 
                {/*Page 7*/}
                <div className="page-break"></div>
                <section>
                    <div
                    style={{ textAlign: 'center', marginBottom: '20px' }}
                    className='flex flex-col justify-center items-center h-full'>
                        <img
                        style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                            src={graph1}
                            alt="Image Not found"
                            className='h-32 m-5 object-contain'
                        />
                        <img
                        style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                            src={graph2}
                            alt="Image Not found"
                            className='h-32 m-5 object-contain'
                        />
                    </div>
 
 
                    <h3>
                        <strong>Interpreting your Leadership Diagnostic Instrument (LDI) Report for Situational Leadership</strong>
                    </h3>
                    <p>
                        <strong>Participant Name</strong>, based on your responses to the Leadership Diagnostic Instrument, you perceive yourself as having a <strong>Coaching Situational Leadership Style</strong>. Reflect on the situations you encounter while working with your team members—ask yourself, is this the right style, or is there a better style that could be more suited?
                    </p>
                    <p>
                        All leadership styles have a particular role depending on the competence and commitment mix of your team, and all of them have value. Your introspection areas are the following:
                    </p>
                </section>
 
                {/* Page 8 */}
                <div className='page-break '>
                    <div className='flex justify-center mt-2 gap-2'>
                        <section className='flex flex-col gap-2 result'>
                            <div>
                                <ReportPieChart result={result} />
                            </div>
                        </section>
                    </div>
                    <section>
                        <ol type="I">
                            <li >
                                If one Leadership Style dominates, ask yourself, is it because of the team development?
                            </li>
                            <li>
                                Are there any other ways you can support your team which can be more useful for where they are?
                            </li>
                            <li>
                                Reflect on:
                            </li>
                        </ol>
                    </section>
                    <section>
                        <table border="1" cellpadding="20" cellspacing="10">
                            <tr>
                                <td>a.</td>
                                <td>Where can you be more directing?</td>
                                <td>Where can you be less directing?</td>
                            </tr>
                            <tr>
                                <td>b.</td>
                                <td>Where can you be more Coaching?</td>
                                <td>Where can you be less Coaching?</td>
                            </tr>
                            <tr>
                                <td>c.</td>
                                <td>Where can you be more Supportive?</td>
                                <td>Where can you be less Supportive?</td>
                            </tr>
                            <tr>
                                <td>d.</td>
                                <td>Where can you be more Delegating?</td>
                                <td>Where can you be less Delegating?</td>
                            </tr>
                        </table>
                    </section>
                </div>
                <style>
                    {`
                        .page-break {
                            page-break-before: always;
                            margin-top:32px;
                        }
                    `}
                </style>
            </div>
            )}
 
            <button onClick={()=>{
                // setShowContent(true)
                handleDownloadPdf()
            }
            } style={{ marginTop: '20px' }}>Download as PDF</button>
        </div>
    );
};
 
export default Report;
 