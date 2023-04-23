export const ProjectDescription = ({ year, role, description, link, technology }) => {
    return (
        <div className="about-project fade-in">
            <div className="about-project__item">
                <ul>
                    <li>Year</li>
                    <li className="list__item">{year}</li>
                </ul>
            </div>
            <div className="about-project__item">
                <ul>
                    <li>Role</li>
                    <li className="list__item">{role}</li>
                </ul>
            </div>
            <div className="about-project__item">
                <ul>
                    <li>Technology</li>
                    {technology.map((item, index) => (
                        <li className="list__item" key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="about-project__item">
                <ul>
                    <li className="list__item">{description}</li>
                </ul>
            </div>
            <a href={link} className="about-project__visit-link link" target="_blank">
                View live site
            </a>
        </div>
    );
};
