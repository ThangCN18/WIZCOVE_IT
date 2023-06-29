import { Row } from "antd";
import React from "react";
import ItemCourseComponent from "./ItemCourseComponent";

const TabItemCourseComponent : React.FC = () => {
    return ( 
        <div className="pb-5">

        <h2 className="py-8 text-3xl text-gray-700 font-bold max-lg:text-xl max-sm:text-sm"
        >The course provides knowledge on both frontend and backend, including popular technologies and skills to develop web applications from start to finish.
</h2>
        <Row gutter={[24, 24]} >
            <ItemCourseComponent/>
            <ItemCourseComponent/>
            <ItemCourseComponent/>
            <ItemCourseComponent/>

        </Row>
        </div>
     );
}

export default TabItemCourseComponent;