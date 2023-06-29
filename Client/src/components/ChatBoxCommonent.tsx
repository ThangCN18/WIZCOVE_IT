// import React, { useState } from "react";
// import { ThemeProvider } from "styled-components";
// import ChatBot, { MessageParser } from "react-simple-chatbot";
// import { Button } from "antd";
// import { IoChatbubblesSharp } from "react-icons/io5";

// const theme = {
//     background: "#f5f8fb",
//     fontFamily: "Helvetica Neue",
//     headerBgColor: "#304EA8",
//     headerFontColor: "#fff",
//     headerFontSize: "20px",
//     botBubbleColor: "#304EA8",
//     botFontColor: "#fff",
//     userBubbleColor: "#CDEAFD,",
//     userFontColor: "#4a4a4a",
// };

// // const steps = [
// //     {
// //         id: "1",
// //         message: "Xin chào, tôi có thể giúp gì cho bạn?",
// //         trigger: "2",
// //     },
// //     {
// //         id: "2",
// //         user: true,
// //         trigger: "3",
// //     },
// //     {
// //         id: "3",
// //         component: (
// //             <MessageParser
// //                 output={[
// //                     {
// //                         intent: "Thông tin sản phẩm",
// //                         patterns: [/sản phẩm/, /giá/, /thông số kỹ thuật/],
// //                         action: () => {
// //                             return "Bạn muốn biết thông tin chi tiết về sản phẩm?";
// //                         },
// //                     },
// //                     {
// //                         intent: "Hỗ trợ mua hàng",
// //                         patterns: [/mua hàng/, /đặt hàng/, /thanh toán/],
// //                         action: () => {
// //                             return "Bạn cần hỗ trợ mua hàng?";
// //                         },
// //                     },
// //                     {
// //                         intent: "Khác",
// //                         action: () => {
// //                             return "Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể thử lại với một yêu cầu khác được không?";
// //                         },
// //                     },
// //                 ]}
// //             />
// //         ),
// //         trigger: "4",
// //     },
// //     {
// //         id: "4",
// //         message: "{previousValue}",
// //         end: true,
// //     },
// // ];

// const steps = [

//     {

//         id: "Greet",

//         message: "Hello, Welcome to Wizcove IT",

//         trigger: "Done",

//     },

//     {

//         id: "Done",

//         message: "What can we do for you?",

//         trigger: "waiting1",

//     },


//     {

//         id: "waiting1",

//         options: [

//             {

//                 value: "React",

//                 label: "React",

//                 trigger: "React",

//             },

//             { value: "Angular", label: "Angular", trigger: "Angular" },

//         ],

//     },

//     {

//         id: "React",

//         message:

//             "Thanks for letting your React issue, Our team will resolve your issue ASAP",

//         end: true,

//     },

//     {

//         id: "Angular",

//         message:

//             "Thanks for letting your Angular issue, Our team will resolve your issue ASAP",

//         end: true,

//     },

// ];



// function ChatBoxCommonent() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isOpenchat, setIsOpenchat] = useState(false);


//     const handleEnd = () => {
//         setIsOpen(false);
//     };

//     return (
//         <div className="fixed flex space-x-2 items-end bottom-5 right-5 shadow-2xl bg-none" style={{ zIndex: 1000 }}>
//             {
//                 isOpenchat ?
//                     <><ThemeProvider theme={theme} >
//                         <ChatBot
//                             headerTitle="Chatbot"
//                             // speechSynthesis={{ enable: true, lang: 'en' }}
//                             steps={steps}
//                             isOpen={isOpen}
//                             handleEnd={handleEnd}
//                         />

//                     </ThemeProvider>
//                         <Button onClick={() => { setIsOpenchat(false) }} className="w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden bg-blue-700 text-3xl text-white"><IoChatbubblesSharp /></Button>

//                     </> :
//                     <Button onClick={() => { setIsOpenchat(true) }} className="w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden bg-blue-700 text-3xl text-white"><IoChatbubblesSharp /></Button>
//             }


//         </div>

//     );
// }

// export default ChatBoxCommonent;


