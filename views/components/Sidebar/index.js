import QuickLink from "./QuickLink";
import Folder from "./Folder";
import styles from "./index.module.scss";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { Book, Bell, CheckSquare, Edit3, Heart } from "react-feather";
import { useTags } from "hooks";
import { Spinner } from "..";

const Sidebar = () => {
  const quickLinks = [
    { name: "All Notes", icon: <Book /> },
    { name: "Reminders", icon: <Bell /> },
    { name: "Tasks", icon: <CheckSquare /> },
    { name: "Favorites", icon: <Heart /> },
    { name: "Hightlights" },
  ];

  const { tags, tagsLoading, createTag } = useTags();

  const onNewEntry = (value) => {
    createTag(value);
  };

  return (
    <div className={styles.sidebar}>
      <nav>
        <Section>
          <SectionTitle title="Quick Links" />
          <li>
            {quickLinks.map((link) => (
              <QuickLink content={link} />
            ))}
          </li>
        </Section>
        <Section>
          <SectionTitle title="Quick Links" onNewEntry={onNewEntry} />
          {tagsLoading ? (
            <Spinner />
          ) : (
            <ul>
              {tags.map((link) => (
                <QuickLink content={link} />
              ))}
            </ul>
          )}
        </Section>
      </nav>
    </div>
  );
};

export default Sidebar;
