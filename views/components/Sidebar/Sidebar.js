import QuickLink from "./QuickLink";
import styles from "./index.module.scss";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { Book, Bell, CheckSquare, Heart, X } from "react-feather";
import { Spinner } from "..";
import { useSelector } from "react-redux";
import { tagsList } from "store/reducers/tagsSlice";
import { NetworkStates } from "store/states";
import { TagService } from "services";

const Sidebar = () => {
  const quickLinks = [
    { name: "All Notes", icon: <Book /> },
    { name: "Reminders", icon: <Bell /> },
    { name: "Tasks", icon: <CheckSquare /> },
    { name: "Favorites", icon: <Heart /> },
    { name: "Hightlights" },
  ];

  const tagsStatus = useSelector((state) => state.tags.status);
  const tags = useSelector(tagsList);

  const onNewEntry = (value) => {
    TagService.create(value);
  };

  return (
    <div className={styles.sidebar}>
      <nav>
        <Section>
          <SectionTitle title="Quick Links" />
          <ul>
            {quickLinks.map((link) => (
              <QuickLink content={link} key={link.name} />
            ))}
          </ul>
        </Section>
        <Section>
          <SectionTitle title="Tags" onNewEntry={onNewEntry} />
          {tagsStatus == NetworkStates.FETCH ? (
            <Spinner />
          ) : (
            <ul>
              {tags.map((link) => (
                <QuickLink
                  content={link}
                  key={link.id}
                  actions={[
                    {
                      label: "Delete",
                      onClick: () => TagService.delete(link.id),
                      icon: <X />,
                    },
                  ]}
                />
              ))}
            </ul>
          )}
        </Section>
      </nav>
    </div>
  );
};

export default Sidebar;
