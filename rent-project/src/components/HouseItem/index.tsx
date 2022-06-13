import * as React from "react";
import "./index.scss"

function HouseItem({
                       houseImg,
                       title,
                       desc,
                       tags,
                       price
                   }: { houseImg: string, title: string, desc: string, tags: [string], price: number }) {
    return (
        <div className={"house"}>
            <div className={"imgWrap"}>
                <img className={"img"} src={`http://localhost:8080${houseImg}`} alt=""/>
            </div>
            <div className={"content"}>
                <h3 className={"title"}>{title}</h3>
                <div className={"desc"}>{desc}</div>
                <div>
                    {/* ['近地铁', '随时看房'] */}
                    {tags.map((tag, index) => {
                        const tagClass = 'tag' + (index + 1)
                        return (
                            <span
                                className={["tag", tagClass].join(' ')}
                                key={tag}
                            >
                                {tag}
                            </span>
                        )
                    })}
                </div>
                <div className={"price"}>
                    <span className={"priceNum"}>{price}</span> 元/月
                </div>
            </div>
        </div>
    )
}

export default HouseItem;