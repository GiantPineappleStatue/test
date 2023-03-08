import ProjectTeamCard from '../ProjectTeamCard/ProjectTeamCard';

const ProjectTeam = ({ team }) => (
    <div className="container-fluid video-credit py-2 px-4 bg-primary-dark">
        <ProjectTeamCard name="Name" position="Position" bio="Bio" urls="Urls" />
        {team.map((item, i) => (
            <ProjectTeamCard
                key={i}
                index={i + 1}
                name={item.name}
                position={item.position}
                bio={item.bio}
                urls={item.urls}
            />
        ))}
    </div>
);

export default ProjectTeam;
